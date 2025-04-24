const AddWidget = ({addWidget}) => {
    return (<div className="flex justify-center"> 
    <select name="selectWidget" onChange={(e)=>addWidget(e.target.value)}>
        <option value="">Select a widget</option>
        <option value="weather">Weather</option>
        <option value="stocks">Stocks</option>
        <option value="calender">Calender</option>
        <option value="news">News</option>
    </select>
</div>)
}

export default AddWidget;