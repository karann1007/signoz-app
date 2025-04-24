import React, { useState, useEffect, useCallback } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import 'react-resizable/css/styles.css';
import { initialWidgets , LOCAL_STORAGE_KEY } from '../constant';
import Widget from './Widget';
import AddWidget from '../AddWidget';

const Dashboard = () => {
    const [widgets, setWidgets] = useState(() => {
        try {
            const savedWidgets = localStorage.getItem(LOCAL_STORAGE_KEY);
            return savedWidgets ? JSON.parse(savedWidgets) : initialWidgets;
        } catch (error) {
            console.error('Failed to load widgets from localStorage', error);
            return initialWidgets;
        }
    });

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(widgets));
    }, [widgets]);

    const handleResize = useCallback((id, newSize) => {
        setWidgets(prevWidgets =>
            prevWidgets.map(widget =>
                widget.id === id ? { ...widget, size: newSize } : widget
            )
        );
    }, []);

    const handleDragEnd = useCallback((event) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = widgets.findIndex(widget => widget.id === active.id);
            const newIndex = widgets.findIndex(widget => widget.id === over?.id);
            setWidgets(prevWidgets => arrayMove(prevWidgets, oldIndex, newIndex));
        }
    }, [widgets]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    );

    const onRemove = (id) => {
        const updatedWidgets = widgets.filter(widget => widget.id != id);
        setWidgets(updatedWidgets);
    }

    const addWidget = (widgetType) => {
        if (widgetType == '') {
            return;
        }
        const newWidget = { id: Date.now(), type: widgetType, size: { width: 300, height: 200 } }
        setWidgets([...widgets, newWidget]);
    }

    const saveData = (id, data) => {
        const updatedWidget = JSON.parse(JSON.stringify(widgets.filter(widget => widget.id == id)[0]));
        updatedWidget.data = data;
        const newWidgets = widgets.map(widget =>
            widget.id === updatedWidget.id ? updatedWidget : widget
        );
        setWidgets(newWidgets);
    }

    return (
        <div className='flex flex-col gap-15'>
            <AddWidget addWidget={addWidget} />
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={widgets.map(widget => widget.id)}>
                    <div className="flex flex-wrap" role="list">
                        {widgets.length > 0 ? widgets.map(widget => (
                            <Widget
                                key={widget.id}
                                id={widget.id}
                                type={widget.type}
                                size={widget.size}
                                onResize={handleResize}
                                onRemove={onRemove}
                                widgetData={widget.data}
                                saveData={saveData}
                            />
                        )) : <h2>Add widgets from dropdown</h2>}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default Dashboard;
