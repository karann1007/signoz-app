export const STOCK_API_KEY = 'PRBH8Q81JYC3NYOU';
export const WEATHER_API_KEY = 'f69e6cea43834031974141934252304';
export const NEWS_API_KEY = 'pub_8280701e79a306f878b4125cfe4a7be79e8ad';

export const initialWidgets = [
    { id: 'weather', type: 'weather', size: { width: 300, height: 200 } },
    { id: 'news', type: 'news', size: { width: 300, height: 200 } },
    { id: 'stocks', type: 'stocks', size: { width: 300, height: 200 } },
    { id: 'calender', type: 'calender', size: { width: 300, height: 200 } }
];

export const CALENDER_DATA = {
    date: Date.now(),
    events: [
        {
            title: "HOLI(static data)"
        },
        {
            title: "DIWALI(static data)"
        },
        {
            title: "CHRISTMAS(static data)"
        }
    ]
}

export const LOCAL_STORAGE_KEY = 'dashboardWidgets';