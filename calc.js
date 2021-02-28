const autoArray = [
    [
        [100, 120, 190, 140, 90, 305],
        [12,43,546,86,23,546],
        [345, 136, 1346, 1230, 2340, 335605]
    ],
    [
        [100, 120, 190, 140, 90, 305],
        [12,143,546,86,23,546],
        [345, 136, 1346, 1230, 2340, 335605]
    ],
    [
        [100, 120, 190, 140, 90, 305],
        [12,243,546,86,23,546],
        [345, 136, 1346, 1230, 2340, 335605]
    ]
]
let activeAuto = 500
let activeComp = []
function activate(el) {
        el.classList.add('active')
}
let i = -1
const autos = document.querySelectorAll('.auto')
const components = document.querySelectorAll('.component')
const materials = document.querySelectorAll('.material')
let price = document.querySelector('.price')
autos.forEach((item, index) => {
    item.addEventListener('click', () => {
        if (item !== autos[activeAuto] && activeAuto !== 500) {
            autos[activeAuto].classList.remove('active')
        }
        components.forEach(item => item.classList.remove('open'))
        activate(item)
        activeAuto = index
        console.log('activeComp'+ activeComp)
        activeComp = []
        console.log('activeComp'+ i)
        components.forEach(item => {
            item.classList.remove('active')
            item.setAttribute('data-mat', '')
        })
        materials.forEach(item => item.classList.remove('active'))
        price.innerHTML = '0'
        calculation()
    })
})
components.forEach((item, indexComp) => {
    item.addEventListener('click', () => {
        console.log(item)
        i = activeComp.indexOf(indexComp);
        console.log(i)
        // materials.forEach(itemMat => {
        //     if (!itemMat.classList.contains('active')) {
        //         activeComp.splice(activeComp,1)
        //         components[indexComp].classList.remove('active')
        //         // activeComp.forEach((item, ind) => {
        //         //     if (item === indexComp) {
        //         //         activeComp.splice(ind, 1)
        //         //     }
        //         // })
        //     }
        // })
        if(i < 0 && activeAuto !== 500) {
            activeComp.push(indexComp)
            console.log('1',activeComp, i)
            i = -1000
            materials.forEach(item => item.classList.remove('active'))
            activate(item)
            components.forEach(item => item.classList.remove('open'))
            item.classList.add('open')
        }   else if (i >= 0 && activeAuto !== 500) {
            i = activeComp.indexOf(indexComp);
            activeComp.forEach((item, index) => {if (item === indexComp)  activeComp.splice(index, 1)})
            console.log('2',activeComp, i)
            item.classList.remove('active')
            item.setAttribute('data-mat', '')
            if (item.classList.contains('active')) {
                materials.forEach(item => item.classList.remove('active'))
                console.log('this el has classList active')
            }
            calculation()

        }
        i = -1
    })
})
materials.forEach((mat, indexMat) => mat.addEventListener('click', () => {
    if (activeAuto !== 500 && activeComp.length > 0) {
        materials.forEach(item => item.classList.remove('active'))
        activate(mat)
        components[activeComp[activeComp.length-1]].setAttribute('data-mat', `${indexMat}`)
        calculation()
    }
}))
function calculation() {
    let calcPrice = 0
    activeComp.forEach(item => {
        let currComp = components[item]
        let currMat = +components[item].getAttribute('data-mat')
        calcPrice += autoArray[activeAuto][currMat][item]
    })
    price.innerHTML = `Итого: ${calcPrice} BYN`
}

