let mainColorBox = document.getElementById('mainColor')
let mainColorContent = mainColorBox.querySelectorAll('p')
let secondaryColorBox = document.getElementById('secondaryColor')
let secColorContent = secondaryColorBox.querySelectorAll('p')
let terciaryColorBox = document.getElementById('terciaryColor')
let terColorContent = terciaryColorBox.querySelectorAll('p')
let complementaryAColorBox = document.getElementById('complementaryA')
let complementaryAContent = complementaryAColorBox.querySelectorAll('p')
let complementaryBColorBox = document.getElementById('complementaryB')
let complementaryBContent = complementaryBColorBox.querySelectorAll('p')
const btnBack = document.getElementById('backColor')
const btnNext = document.getElementById('nextColor')
const btnNewColor = document.getElementById('newColor')
let successCopyDiv = document.getElementById('successCopy')

btnNewColor.addEventListener('click', newColor)
btnNext.addEventListener('click', nextColor)
btnBack.addEventListener('click', backColor)

const recordSection = document.getElementById('recordSection')
let record = []
let index = 0
let modo

function newColor() {
    const h = Math.floor(Math.random() * 360)
    const s = Math.floor(Math.random() * 100)
    const l = Math.floor(Math.random() * 100)
    index = record.length

    const randomModo = Math.floor(Math.random() * 4)
    switch (randomModo) {
        case 0:
            // console.log('análogo');
            modo = 'a'
            break
        case 1:
            // console.log('complementario');
            modo = 'c'
            break
        case 2:
            // console.log('triádico');
            modo = 't'
            break
        case 3:
            // console.log('mono  cromático');
            modo = 'm'
            break
    }
    let base = { "h": h, "s": s, "l": l }
    let secondary = getSecondary(base, modo)
    let terciary = getTerciary(base, modo)
    let compA = getComplementaryA(base, modo)
    let compB = getComplementaryB(base, modo)

    const obj = { "main": { "h": h, "s": s, "l": l }, "secondary": { "h": secondary[0], "s": secondary[1], "l": secondary[2] }, "terciary": { "h": terciary[0], "s": terciary[1], "l": terciary[2] }, "compA": { "h": compA[0], "s": compA[1], "l": compA[2] }, "compB": { "h": compB[0], "s": compB[1], "l": compB[2] } }

    record.push(obj)

    const colorGroup = document.createElement('div')

    const recMainColor = document.createElement('span')
    recMainColor.setAttribute('class', 'rec-mainColor')
    recMainColor.style.backgroundColor = `hsl(${obj.main.h}deg, ${obj.main.s}%, ${obj.main.l}%)`

    const recSecondaryColor = document.createElement('span')
    recSecondaryColor.setAttribute('class', 'rec-secondaryColor')
    recSecondaryColor.style.backgroundColor = `hsl(${obj.secondary.h}deg, ${obj.secondary.s}%, ${obj.secondary.l}%)`

    const recTerciaryColor = document.createElement('span')
    recTerciaryColor.setAttribute('class', 'rec-terciaryColor')
    recTerciaryColor.style.backgroundColor = `hsl(${obj.terciary.h}deg, ${obj.terciary.s}%, ${obj.terciary.l}%)`

    const recComplementaryA = document.createElement('span')
    recComplementaryA.setAttribute('class', 'rec-complementaryA')
    recComplementaryA.style.backgroundColor = `hsl(${obj.compA.h}deg, ${obj.compA.s}%, ${obj.compA.l}%)`

    const recComplementaryB = document.createElement('span')
    recComplementaryB.setAttribute('class', 'rec-complementaryB')
    recComplementaryB.style.backgroundColor = `hsl(${obj.compB.h}deg, ${obj.compB.s}%, ${obj.compB.l}%)`

    colorGroup.setAttribute('class', 'color-group')
    recordSection.appendChild(colorGroup)
    colorGroup.appendChild(recMainColor)
    colorGroup.appendChild(recSecondaryColor)
    colorGroup.appendChild(recTerciaryColor)
    colorGroup.appendChild(recComplementaryA)
    colorGroup.appendChild(recComplementaryB)
    recordSection.scrollTo(recordSection.scrollWidth, 0
    )
    colorGroup.addEventListener('click', function () {
        applyColor(mainColorBox, obj.main, mainColorContent) // COLOR PRINCIPAL
        applyColor(secondaryColorBox, obj.secondary, secColorContent)
        applyColor(terciaryColorBox, obj.terciary, terColorContent)
        applyColor(complementaryAColorBox, obj.compA, complementaryAContent)
        applyColor(complementaryBColorBox, obj.compB, complementaryBContent)
    })
    refreshPalette()
}
function getSecondary(base, modo) {
    switch (modo) {
        case 'a':
            return [fix360(base.h + 30 + variacion(5, (-5))), variacion(100, 0), variacion(100, 0)]
            break
        case 'c':
            return [fix360(base.h + 180), base.s, base.l]
            break
        case 't':
            return [fix360(base.h + 120 + variacion(5, (-5))), base.s + variacion(5, (-5)), base.l + variacion(5, (-5))]
            break
        case 'm':
            return [base.h, base.s - 20, base.l + 20]
            break
    }
}
function getTerciary(base, modo) {
    switch (modo) {
        case 'a':
            return [fix360(base.h - 30 + variacion(5, (-5))), variacion(100, 0), variacion(100, 0)]
            break
        case 'c':
            return [fix360(base.h + 180), base.s - 30 - variacion(5, (-5)), base.l + 30 + variacion(5, (-5))]
            break
        case 't':
            return [fix360(base.h + 240 + variacion(5, (-5))), base.s + variacion(5, (-5)), base.l + variacion(5, (-5))]
            break
        case 'm':
            return [fix360(base.h), base.s - 35, base.l + 35]
            break
    }
}
function getComplementaryA(base, modo) {
    switch (modo) {
        case 'a':
            return [fix360(base.h + 45 + variacion(5, (-5))), variacion(100, 0), variacion(100, 0)]
            break
        case 'c':
            return [fix360(base.h + 180 + variacion(15, (-15))), base.s - 60 - variacion(5, (-5)), base.l + 60 + variacion(5, (-5))]
            break
        case 't':
            return [fix360(base.h + variacion(5, (-5))), base.s - 30 + variacion(5, (-5)), base.l + 30 + variacion(5, (-5))]
            break
        case 'm':
            return [fix360(base.h), base.s - 50, base.l + 50]
            break
    }
}
function getComplementaryB(base, modo) {
    switch (modo) {
        case 'a':
            return [fix360(base.h - 45 + variacion(5, (-5))), variacion(100, 0), variacion(100, 0)]
            break
        case 'c':
            return [fix360(base.h), base.s - 20 - variacion(5, (-5)), base.l + 30 + variacion(5, (-5))]
            break
        case 't':
            return [fix360(base.h + 240 + variacion(5, (-5))), base.s - 30 + variacion(5, (-5)), base.l + 30 + variacion(5, (-5))]
            break
        case 'm':
            return [fix360(base.h), base.s - 70, base.l + 70]
            break
    }
}
function fix360(hue) {
    let output = 0
    if (hue < 0) {
        output = hue + 360
        return output
    } else if (hue > 360) {
        output = hue - 360
        return output
    } else {
        return hue
    }
}
function variacion(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
function backColor() {
    if (index > 0) {
        index--
        refreshPalette()
    } else {
        console.log('|<--------');
    }
}
function nextColor() {
    if (index < record.length - 1) {
        index++
        refreshPalette()
    } else {
        console.log('--------->|');
    }
}
function applyColor(box, color, content) {
    box.style.backgroundColor = `hsl(${color.h}deg, ${color.s}%, ${color.l}%)`

    let hex = window.getComputedStyle(box).backgroundColor
    const match = hex.match(/\d+/g)
    let r = parseInt(match[0], 10)
    let g = parseInt(match[1], 10)
    let b = parseInt(match[2], 10)

    function padCheck(x) {
        if (x.length < 2) {
            x = 0 + x
        }
        return x
    }
    let rHex = padCheck(r.toString(16))
    let gHex = padCheck(g.toString(16))
    let bHex = padCheck(b.toString(16))
    let textColor = ''
    if (color.l > 50) {
        content.forEach(function (e) {
            e.style.color = 'black'
            textColor = 'black'
        })
    } else {
        content.forEach(function (e) {
            e.style.color = 'white'
            textColor = 'white'
        })
    }
    content[1].innerHTML = '#' + rHex + gHex + bHex
    content[3].innerHTML = `R: ${r} <br /> G: ${g} <br /> B: ${b}`
    box.addEventListener('click', function () {
        const string = '#' + rHex + gHex + bHex
        navigator.clipboard.writeText(string)

        successCopyDiv.style.backgroundColor = string
        successCopyDiv.style.color = textColor
        successCopyDiv.style.bottom = 0
        const timeOut = setTimeout(() => {
            successCopyDiv.style.bottom = '-6vh'
        }, 2000);
    })
}
function refreshPalette() {
    const obj = record[index]
    applyColor(mainColorBox, obj.main, mainColorContent) // COLOR PRINCIPAL
    applyColor(secondaryColorBox, obj.secondary, secColorContent)
    applyColor(terciaryColorBox, obj.terciary, terColorContent)
    applyColor(complementaryAColorBox, obj.compA, complementaryAContent)
    applyColor(complementaryBColorBox, obj.compB, complementaryBContent)
}
document.addEventListener("keydown", function (e) {
    switch (e.key) {
        case " ":
            newColor();
            break;
        case "ArrowLeft":
            backColor();
            break;
        case "ArrowRight":
            nextColor();
            break;
    }
});
newColor()