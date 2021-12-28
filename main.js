const leftSide = document.querySelector(".left-side")
const rightSide = document.querySelector(".right-side")
const checkedToRightButton = document.querySelector(".checked-to-right")
const allToRightButton = document.querySelector(".all-to-right")
const checkedToLeftButton = document.querySelector(".checked-to-left")
const allToLeftButton = document.querySelector(".all-to-left")
const addButton = document.querySelector(".add-button")
const inputBox = document.querySelector(".input-box")

let item = 8 //initial number of items in lists

// InitialValues
let leftList = [
    { id: "item1", checked: false, title: "PHP" },
    { id: "item2", checked: false, title: "Python" },
    { id: "item3", checked: false, title: "Ruby" },
    { id: "item4", checked: false, title: "C++" },
]
let rightList = [
    { id: "item5", checked: false, title: "HTML" },
    { id: "item6", checked: false, title: "Css" },
    { id: "item7", checked: false, title: "JavaScript" },
    { id: "item8", checked: false, title: "Java" },
]

renderDom(leftList, rightList)
registerEvents()

// Render Dom
function renderDom(leftListToRender, rightListToRender) {
    leftListToRender.forEach((item) => {
        leftSide.innerHTML += `<div class="box box-left">
          <input type="checkbox" class="input-box" id="${item.id}" />
          <label for="${item.id}">${item.title}</label>
          </div>`
    })
    rightListToRender.forEach((item) => {
        rightSide.innerHTML += `<div class="box box-right">
              <input type="checkbox" class="input-box" id="${item.id}" />
              <label for="${item.id}">${item.title}</label>
              </div>`
    })
}

// Clear Dom
function clearDom() {
    document.querySelectorAll(".side").forEach((el) => {
        el.innerHTML = ""
    })
}

// register all click events
function registerEvents() {
    // Adding New Item
    addButton.addEventListener('click', (e) => {
        e.preventDefault()
        if (inputBox.value === "") return
        clearDom()
        item = item + 1
        leftList.push({ id: `item${item}`, checked: false, title: inputBox.value })
        inputBox.value = ''
        renderDom(leftList, rightList)
    })

    // Transfer Items From Left To Right  
    checkedToRightButton.addEventListener('click', (e) => {
        e.preventDefault()
        let leftSideItems = document.querySelectorAll('.box-left')
        leftSideItems.forEach((item) => {
            if (item.firstElementChild.checked) {
                leftList = leftList.filter(e => e.id != item.firstElementChild.id.toString())
                rightList.push({ id: item.firstElementChild.id, checked: false, title: item.lastElementChild.textContent })
                rightSide.appendChild(item)
                item.firstElementChild.checked = false
            }
        })
            clearDom()
            renderDom(leftList, rightList)
    })

    // Transfer All Items From Left To Right  
    allToRightButton.addEventListener('click', (e) => {
        e.preventDefault()
        let leftSideItems = document.querySelectorAll('.box-left')
        leftSideItems.forEach((item) => {
            leftList = leftList.filter(e => e.id != item.firstElementChild.id.toString())
            rightList.push({ id: item.firstElementChild.id, checked: false, title: item.lastElementChild.textContent })
            rightSide.appendChild(item)
            item.firstElementChild.checked = false
        })
        clearDom()
        renderDom(leftList, rightList)

    })

    // Transfer Items From Right To Left
    checkedToLeftButton.addEventListener('click', (e) => {
        e.preventDefault()
        let rightSideItems = document.querySelectorAll('.box-right')

        rightSideItems.forEach((item) => {
            if (item.firstElementChild.checked) {
                rightList = rightList.filter(e => e.id != item.firstElementChild.id.toString())
                leftList.push({ id: item.firstElementChild.id, checked: false, title: item.lastElementChild.textContent })
                leftSide.appendChild(item)
                item.firstElementChild.checked = false
            }
        })
            clearDom()
            renderDom(leftList, rightList)
    })
    // Transfer All Items From Right to Left
    allToLeftButton.addEventListener('click', (e) => {
        e.preventDefault()
        let rightSideItems = document.querySelectorAll('.box-right')
        rightSideItems.forEach((item) => {
            rightList = rightList.filter(e => e.id != item.firstElementChild.id.toString())
            leftList.push({ id: item.firstElementChild.id, checked: false, title: item.lastElementChild.textContent })
            leftSide.appendChild(item)
            item.firstElementChild.checked = false
        })

        clearDom()
        renderDom(leftList, rightList)
    })
}
