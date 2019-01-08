console.log(12345);

const html = {
    name: document.querySelector('input[type=text]'),
    amount: document.querySelector("input[type=number]"),
    btn: document.querySelector('button'),
    form: document.querySelector('form'),
    list: document.querySelector('ul'),
    total: document.querySelector('h2'),
    del: document.querySelectorAll('span')
};
var total = 0;
var data = [];
//rasant i input name isvesti verte i console.
//rasant i input amount isvesti verte i console.

// paspaudus

html.name.addEventListener('input',()=>{
    console.log(html.name.value)
});
html.amount.addEventListener('input',()=>{
    console.log(html.amount.value)
});

html.form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const id =_.uniqueId();
    const name = html.name.value;
    const amount = parseFloat(html.amount.value);

    // sukuriam li elementa su parametrais --VIEW
    const li = `<li>${name}: ${amount}€ <span data-id="${id}">x</span></li>`;
    html.list.insertAdjacentHTML("afterbegin", li);
    // sukuriam objekta ir itraukiam i data --DATA
    data.push({name, amount, id}); // ES6 kai key yra kaip value galima rasyti {name, amount}
    console.log(data);

    // susumuoti vertes
    total+=amount;
    // atvaizduoti reiksmes
    // html.total.textContent = 'Viso: '+total+'€';
    html.total.textContent = `Viso: ${total} €`;
    //isvalymas inputu
    html.name.value= '';
    html.amount.value= '';
});

// uzdedam event listner and tevinio elemento (ul)
html.list.addEventListener('click', (e)=>{
    console.log(e.target);

    //parent.removeChild(childNode)
    if(!e.target.matches('span')) return;
    html.list.removeChild(e.target.parentNode);

    //is masyvo istrinam objekta pagal ID kuris gautas paspaudus ant span
    data = data.filter((item)=>{
        if(item.id!==e.target.dataset.id){
            return item
        }else{
            total-= item.amount
        }
    });
    // atvaizduojam total verte
    html.total.textContent= `Viso: ${total}€`;
});