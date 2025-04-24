import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ResizableBox } from 'react-resizable';
import Weather from './widgets/Weather';
import News from './widgets/News';
import Stock from './widgets/Stock';
import Calender from './widgets/Calender';

const Widget = ({ id, type, size, onResize, onRemove, widgetData, saveData }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        margin: '10px',
        outline: isDragging ? '2px solid #3b82f6' : 'none',
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} role="listitem" aria-label={`Widget: ${type}`} tabIndex={0}>
            <ResizableBox className='widget' width={size.width} height={size.height}
                onResizeStop={(e, data) => onResize(id, { width: data.size.width, height: data.size.height })}
                resizeHandles={['s', 'e', 'se']} minConstraints={[150, 100]}>
                <div className="bg-white shadow-md rounded p-4 h-full w-full overflow-hidden" role="region" aria-labelledby={`widget-${id}-title`}>
                    <div className='flex flex-row justify-between m-5'>
                        <h3 id={`widget-${id}-title`} className="text-lg font-bold mb-2">{type.toUpperCase()}</h3>
                        <button {...listeners} className="drag-handle cursor-move" title="Drag widget">⠿</button>
                        <button className='remove-button' onClick={() => onRemove(id)}>x</button>
                    </div>
                    {/* COULD BE DONE IN A BETTER WAY !! SWITCH-CASE MAYBE ? */}
                    {(type == 'weather') ? <Weather id={id} widgetData={widgetData} saveData={saveData} /> : <></>}
                    {(type == 'news') ? <News id={id} widgetData={widgetData} /> : <></>}
                    {(type == 'stocks') ? <Stock id={id} widgetData={widgetData} saveData={saveData} /> : <></>}
                    {(type == 'calender') ? <Calender id={id} widgetData={widgetData} /> : <></>}
                </div>
            </ResizableBox>
        </div>
    );
};

export default Widget;