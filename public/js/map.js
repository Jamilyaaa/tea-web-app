// //get data from db
const getLocation = async () => {
    const response = await fetch('/all');
    const data = await response.json();
    return [...data]
}

//Map generate
async function init() {
    const myMap = new ymaps.Map('map', {
        center: [55.8, 37.6],
        zoom: 2,
        controls: ['zoomControl'],
        behaviors: ['drag'],
    });

    (await getLocation()).forEach((el)=>{
        myMap.geoObjects.add(new ymaps.Placemark(
            el.location,
            {
            hintContent: el.tea_name,
            balloonContent: el.description
        }
        ))
    });
}
ymaps.ready(init); // Map initiate



