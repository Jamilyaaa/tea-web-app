// //get data from db
const getLocation = async () => {
    const response = await fetch('/all');
    const data = await response.json();
    return [...data]
}

//Map generate
async function init() {
    const myMap = new ymaps.Map('map', {
        center: [15.8, 25.6],
        zoom: 4,
        controls: ['zoomControl'],
        behaviors: ['drag'],
    });

    (await getLocation()).forEach((el)=>{
        myMap.geoObjects.add(new ymaps.Placemark(
            el.location,
            {
            hintContent: el.tea_name,
            balloonContent: el.description + `<a href="/tea/${el.id}">MORE</a>`
        }
        ))
    });
}
ymaps.ready(init); // Map initiate



