class Person {
    constructor(name, birth, death, image, wiki) {
        let idCount = getIdCount();
        this.id = idCount;
        updateIdCount();
        this.name = name;
        this.birth = birth;
        this.death = death;
        this.image = image;
        this.wiki = wiki;
    }
}

class Entity extends Person {
    relatedPeople;

    constructor(name, birth, death, image, wiki, relatedPeople) {
        super(name, birth, death, image, wiki);
        this.relatedPeople = relatedPeople;
    }
}

class Product extends Entity {
    relatedEntities;

    constructor(name, birth, death, image, wiki, relatedPeople, relatedEntities) {
        super(name, birth, death, image, wiki, relatedPeople);
        this.relatedEntities = relatedEntities;
    }
}

class Writer {
    username;
    password;

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

function getIdCount() {
    return (getFromLocalStorageNoParse("idCount"));
}

function updateIdCount() {
    let idCount = getFromLocalStorageNoParse("idCount");
    idCount++;
    setLocalStorage("idCount", idCount);
}

function start() {
    loadLocalStorage();
    window.location.href = "index.html";
}

function loadLocalStorage() {
    setLocalStorage("isLogged", false);
    setLocalStorage("idCount", 1);
    
    let products = [];
    let people = [];
    let entities = [];

    let person = new Person("Tim Berners-Lee", "08/06/1955", "", "https://upload.wikimedia.org/wikipedia/commons/4/4e/Sir_Tim_Berners-Lee_%28cropped%29.jpg", "https://es.wikipedia.org/wiki/Tim_Berners-Lee");
    let entity = new Entity("CERN", "29/09/1954", "", "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/CERN_logo.svg/1200px-CERN_logo.svg.png", "https://es.wikipedia.org/wiki/Organizaci%C3%B3n_Europea_para_la_Investigaci%C3%B3n_Nuclear", [person]);
    let product = new Product("HTML", "01/01/1980", "", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/HTML5_logo_black.svg/2048px-HTML5_logo_black.svg.png", "https://es.wikipedia.org/wiki/HTML", [person], [entity]);
    let person2 = new Person("Håkon Wium Lie", "26/07/1965", "", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/H%C3%A5kon-Wium-Lie-2009-03.jpg/1200px-H%C3%A5kon-Wium-Lie-2009-03.jpg", "https://en.wikipedia.org/wiki/H%C3%A5kon_Wium_Lie");
    let entity2 = new Entity("IBM", "16/06/1911", "", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1200px-IBM_logo.svg.png", "https://es.wikipedia.org/wiki/IBM", []);
    let product2 = new Product("CSS", "17/12/1996", "", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png", "https://es.wikipedia.org/wiki/CSS", [person2], []);
    let person3 = new Person("Brendan Eich", "01/01/1961", "", "https://upload.wikimedia.org/wikipedia/commons/d/d1/Brendan_Eich_Mozilla_Foundation_official_photo.jpg", "https://es.wikipedia.org/wiki/Brendan_Eich");
    let entity3 = new Entity("Netscape Communications", "04/04/1994", "", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Netscape_logo.svg/320px-Netscape_logo.svg.png", "https://es.wikipedia.org/wiki/Netscape_Communications_Corporation", [person3]);
    let product3 = new Product("Javascript", "04/12/1995", "", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png", "https://es.wikipedia.org/wiki/JavaScript", [person3], [entity3]);

    people.push(person);
    people.push(person2);
    people.push(person3);
    entities.push(entity);
    entities.push(entity2);
    entities.push(entity3);
    products.push(product);
    products.push(product2);
    products.push(product3);

    setLocalStorage("products", products);
    setLocalStorage("entities", entities);
    setLocalStorage("people", people);

    let writerX = new Writer("x", "x");
    let writerY = new Writer("y", "y");
    let writerZ = new Writer("z", "z");
    let writers = [writerX, writerY, writerZ];
    setLocalStorage("writers", writers);
}

function loadIndex() {
    let section1 = document.getElementById("section1");
    section1.innerHTML = "";
    let section2 = document.getElementById("section2");
    section2.innerHTML = "";
    let isLogged = getFromLocalStorage("isLogged");
    if(isLogged)
        loadWriterForm();
    else
        loadReaderForm();
    loadIndexTable(isLogged);
}

function loadReaderForm() {
    let section = document.getElementById("section1");
    section.innerHTML = '<form id="loginForm">';
    section.innerHTML += '<label for="Usuario" class = "username">Usuario</label>';
    section.innerHTML += '<input id="username" type="text" name="Usuario"/>';
    section.innerHTML += '<label for="Contraseña" class = "contraseña">Contraseña</label>';
    section.innerHTML += '<input id="password" type="password" name="Contraseña"/>';
    section.innerHTML += '<input type="button" class = "login" name="Login" value="Iniciar sesión" onclick = "login();"/>';
    section.innerHTML += '</form>';
}

function loadWriterForm() {
    let section = document.getElementById("section1");
    section.innerHTML = '<form id="logoutForm" action="readerIndex.html">';
    section.innerHTML += '<input type="button" name="Logout" value="Cerrar sesión" onclick = "logout();"/>';
    section.innerHTML += '</form>';
}

function loadIndexTable(isLogged) {
    let section2 = document.getElementById("section2");
    let table = document.createElement("table");
    let thead = loadthead();
    if(isLogged)
        tbody = loadWritertbody();
    else
        tbody = loadReadertbody();
    table.appendChild(thead);
    table.appendChild(tbody);
    section2.appendChild(table);
}

function loadthead() {
    let thead = document.createElement("thead");
    let trHead = document.createElement("tr");
    let tdHead1 = document.createElement("td");
    let p1 = document.createElement("p");
    let text1 = document.createTextNode("Productos");
    p1.appendChild(text1);
    tdHead1.appendChild(p1);
    trHead.appendChild(tdHead1);
    let tdHead2 = document.createElement("td");
    let p2 = document.createElement("p");
    let text2 = document.createTextNode("Personas");
    p2.appendChild(text2);
    tdHead2.appendChild(p2);
    trHead.appendChild(tdHead2);
    let tdHead3 = document.createElement("td");
    let p3 = document.createElement("p");
    let text3 = document.createTextNode("Entidades");
    p3.appendChild(text3);
    tdHead3.appendChild(p3);
    trHead.appendChild(tdHead3);
    thead.appendChild(trHead);
    return thead;
}

function loadReadertbody() {
    let tbody = document.createElement("tbody");
    let products = getFromLocalStorage("products");
    let people = getFromLocalStorage("people");
    let entities = getFromLocalStorage("entities");
    let maxLength = Math.max(products.length, people.length, entities.length);
    for(let i = 0; i < maxLength; i++) {
        let tr = document.createElement("tr");
        if(i < products.length) {
            let td1 = document.createElement("td");
            let img = document.createElement("img");
            img.setAttribute("src", products[i].image);
            img.setAttribute("alt", products[i].name);
            img.setAttribute("width", "5%");
            td1.appendChild(img);
            let a = document.createElement("a");
            let productName = document.createTextNode(products[i].name);
            a.appendChild(productName);
            a.setAttribute("id", products[i].id);
            a.addEventListener('click', showProduct);
            td1.appendChild(a);
            tr.appendChild(td1);
        }
        else {
            let td1 = document.createElement("td");
            tr.appendChild(td1);
        }
        if(i < people.length) {
            let td2 = document.createElement("td");
            let img = document.createElement("img");
            img.setAttribute("src", people[i].image);
            img.setAttribute("alt", people[i].name);
            img.setAttribute("width", "5%");
            td2.appendChild(img);
            let a = document.createElement("a");
            let personName = document.createTextNode(people[i].name);
            a.appendChild(personName);
            a.setAttribute("id", people[i].id);
            a.addEventListener('click', showPerson);
            td2.appendChild(a);
            tr.appendChild(td2);
        }
        else {
            let td2 = document.createElement("td");
            tr.appendChild(td2);
        }
        if(i < entities.length) {
            let td3 = document.createElement("td");
            
            let img = document.createElement("img");
            img.setAttribute("src", entities[i].image);
            img.setAttribute("alt", entities[i].name);
            img.setAttribute("width", "5%");
            td3.appendChild(img);
            let a = document.createElement("a");
            let entityName = document.createTextNode(entities[i].name);
            a.appendChild(entityName);
            a.setAttribute("id", entities[i].id);
            a.addEventListener('click', showEntity);
            td3.appendChild(a);
            tr.appendChild(td3);
        }
        else {
            let td3 = document.createElement("td");
            tr.appendChild(td3);
        }
        tbody.appendChild(tr);
    }
    return tbody;
}

function loadWritertbody() {
    let tbody = document.createElement("tbody");
    let products = getFromLocalStorage("products")
    let people = getFromLocalStorage("people");
    let entities = getFromLocalStorage("entities");
    let maxLength = Math.max(products.length, people.length, entities.length);
    for(let i = 0; i < maxLength + 1; i++) {
        let tr = document.createElement("tr");
        if(i < products.length) {
            let td1 = document.createElement("td");
            let img = document.createElement("img");
            img.setAttribute("src", products[i].image);
            img.setAttribute("alt", products[i].name);
            img.setAttribute("width", "5%");
            td1.appendChild(img);
            let a = document.createElement("a");
            let productName = document.createTextNode(products[i].name);
            a.appendChild(productName);
            a.setAttribute("id", products[i].id);
            a.addEventListener('click', showProduct);
            td1.appendChild(a);
            let editButton = document.createElement("button");
            editButton.setAttribute("id", products[i].id);
            editButton.type = "button";
            editButton.innerText = "Editar";
            editButton.addEventListener('click', updateProduct);
            td1.appendChild(editButton);
            let deleteButton = document.createElement("button");
            deleteButton.setAttribute("id", products[i].id);
            deleteButton.type = "button";
            deleteButton.innerText = "Borrar";
            deleteButton.addEventListener('click', deleteProduct);
            td1.appendChild(deleteButton);
            tr.appendChild(td1);
        }
        else if(i === products.length) {
            let td1 = document.createElement("td");
            let createButton = document.createElement("button");
            createButton.type = "button";
            createButton.setAttribute("class", "createButton");
            createButton.innerText = "Crear";
            createButton.addEventListener('click', createProduct);
            td1.appendChild(createButton);
            tr.appendChild(td1);
        }
        else {
            let td1 = document.createElement("td");
            tr.appendChild(td1);
        }
        if(i < people.length) {
            let td2 = document.createElement("td");
            let img = document.createElement("img");
            img.setAttribute("src", people[i].image);
            img.setAttribute("alt", people[i].name);
            img.setAttribute("width", "5%");
            td2.appendChild(img);
            let a = document.createElement("a");
            let personName = document.createTextNode(people[i].name);
            a.appendChild(personName);
            a.setAttribute("id", people[i].id);
            a.addEventListener('click', showPerson);
            td2.appendChild(a);
            let editButton = document.createElement("button");
            editButton.setAttribute("id", people[i].id);
            editButton.type = "button";
            editButton.innerText = "Editar";
            editButton.addEventListener('click', updatePerson);
            td2.appendChild(editButton);
            let deleteButton = document.createElement("button");
            deleteButton.setAttribute("id", people[i].id);
            deleteButton.type = "button";
            deleteButton.innerText = "Borrar";
            deleteButton.addEventListener('click', deletePerson);
            td2.appendChild(deleteButton);
            tr.appendChild(td2);
        }
        else if(i === people.length) {
            let td2 = document.createElement("td");
            let createButton = document.createElement("button");
            createButton.type = "button";
            createButton.setAttribute("class", "createButton");
            createButton.innerText = "Crear";
            createButton.addEventListener('click', createPerson);
            td2.appendChild(createButton);
            tr.appendChild(td2);
        }
        else {
            let td2 = document.createElement("td");
            tr.appendChild(td2);
        }
        if(i < entities.length) {
            let td3 = document.createElement("td");
            
            let img = document.createElement("img");
            img.setAttribute("src", entities[i].image);
            img.setAttribute("alt", entities[i].name);
            img.setAttribute("width", "5%");
            td3.appendChild(img);
            let a = document.createElement("a");
            let entityName = document.createTextNode(entities[i].name);
            a.appendChild(entityName);
            a.setAttribute("id", entities[i].id);
            a.addEventListener('click', showEntity);
            td3.appendChild(a);
            let editButton = document.createElement("button");
            editButton.setAttribute("id", entities[i].id);
            editButton.type = "button";
            editButton.innerText = "Editar";
            editButton.addEventListener('click', updateEntity);
            td3.appendChild(editButton);
            let deleteButton = document.createElement("button");
            deleteButton.setAttribute("id", entities[i].id);
            deleteButton.type = "button";
            deleteButton.innerText = "Borrar";
            deleteButton.addEventListener('click', deleteEntity);
            td3.appendChild(deleteButton);
            tr.appendChild(td3);
        }
        else if(i === entities.length) {
            let td3 = document.createElement("td");
            let createButton = document.createElement("button");
            createButton.type = "button";
            createButton.setAttribute("class", "createButton");
            createButton.innerText = "Crear";
            createButton.addEventListener('click', createEntity);
            td3.appendChild(createButton);
            tr.appendChild(td3);
        }
        else {
            let td3 = document.createElement("td");
            tr.appendChild(td3);
        }
        tbody.appendChild(tr);
    }
    return tbody;
}

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if(validateCredentials(username, password)) {
        updateIsLogged();
        loadIndex();
    }
    else {
        alert("Usuario o contraseña incorrectos");
        loadIndex();
    }
}

function validateCredentials(username, password) {
    let writers = getFromLocalStorage("writers");
    for(let i = 0; i < writers.length; i++)
        if(writers[i].username === username && writers[i].password === password) 
            return true;
    return false;
}

function logout() {
    updateIsLogged();
    loadIndex();
}

function updateIsLogged() {
    let isLogged = getFromLocalStorage("isLogged");
    isLogged = !isLogged;
    setLocalStorage("isLogged", isLogged);
}

function showProduct(event) {
    let id = event.target.id;
    let products = getFromLocalStorage("products");
    let product = findElementById(products, id);
    setLocalStorage("myElement", product);
    setLocalStorageNoStringify("myElementType", "productType");
    window.location.href = "elementInfo.html";
}

function showPerson(event) {
    let id = event.target.id;
    let people = getFromLocalStorage("people");
    let person = findElementById(people, id);
    setLocalStorage("myElement", person);
    setLocalStorageNoStringify("myElementType", "personType");
    window.location.href = "elementInfo.html";
}

function showEntity(event) {
    let id = event.target.id;
    let entities = getFromLocalStorage("entities");
    let entity = findElementById(entities, id);
    setLocalStorage("myElement", entity);
    setLocalStorageNoStringify("myElementType", "entityType");
    window.location.href = "elementInfo.html";
}

function loadElementInfo() {
    let myElement = getFromLocalStorage("myElement");
    let myElementType = getFromLocalStorageNoParse("myElementType");
    let section = document.getElementById("section");
    section.innerHTML = '<iframe src="' + myElement.wiki + '" alt="' + myElement.name + '"></iframe>';
    let aside = document.getElementById("aside");
    aside.innerHTML = '<h3><b>' + myElement.name + '</b></h3>';
    aside.innerHTML += '<h4><b>' + myElement.birth + '</b></h4>';
    if(myElement.death == "")
        myElement.death = "Vivo";
    aside.innerHTML += '<h4><b>' + myElement.death + '</b></h4>';
    aside.innerHTML += '<img src="' + myElement.image + '" alt="' + myElement.name + '" width="10%"/>';
    if(myElementType === "productType")
        loadRelatedWithProducts(myElement);
    else if(myElementType === "personType")
        loadRelatedWithPeople(myElement);
    else if(myElementType === "entityType")
        loadRelatedWithEntities(myElement);
    else
        alert("Error: element desconocido.");
}

function loadRelatedWithProducts(myElement) {
    let footer = document.getElementById("footer");

    let div1 = document.createElement("div");
    div1.setAttribute("class", "foot1");
    let p1 = document.createElement("p");
    let title1 = document.createTextNode("Entidades relacionadas");
    p1.appendChild(title1);
    div1.appendChild(p1);
    if(myElement.relatedEntities != undefined)
        for(let i = 0; i < myElement.relatedEntities.length; i++) {
            let article = document.createElement("article");
            let img = document.createElement("img");
            img.setAttribute("src", myElement.relatedEntities[i].image);
            img.setAttribute("alt", myElement.relatedEntities[i].name);
            img.setAttribute("class", "imageFooter");
            article.appendChild(img);
            let a = document.createElement("a");
            let name = document.createTextNode(myElement.relatedEntities[i].name);
            a.appendChild(name);
            a.setAttribute("id", myElement.relatedEntities[i].id);
            a.addEventListener('click', showEntity);
            article.appendChild(a);
            div1.appendChild(article);
        }
    footer.appendChild(div1);

    let div2 = document.createElement("div");
    div2.setAttribute("class", "foot2");
    let p2 = document.createElement("p");
    let title2 = document.createTextNode("Personas relacionadas");
    p2.appendChild(title2);
    div2.appendChild(p2);
    if(myElement.relatedPeople != undefined)
        for(let i = 0; i < myElement.relatedPeople.length; i++) {
            let article = document.createElement("article");
            let img = document.createElement("img");
            img.setAttribute("src", myElement.relatedPeople[i].image);
            img.setAttribute("alt", myElement.relatedPeople[i].name);
            img.setAttribute("class", "imageFooter");
            article.appendChild(img);
            let a = document.createElement("a");
            let name = document.createTextNode(myElement.relatedPeople[i].name);
            a.appendChild(name);
            a.setAttribute("id", myElement.relatedPeople[i].id);
            a.addEventListener('click', showPerson);
            article.appendChild(a);
            div2.appendChild(article);
        }
    footer.appendChild(div2);
}

function loadRelatedWithPeople(myElement) {
    let footer = document.getElementById("footer");

    let div1 = document.createElement("div");
    div1.setAttribute("class", "foot1");
    let p1 = document.createElement("p");
    let title1 = document.createTextNode("Productos relacionados");
    p1.appendChild(title1);
    div1.appendChild(p1);

    let myElementId = myElement.id;
    let products = getFromLocalStorage("products");
    for(let i = 0; i < products.length; i++) {
        let iProduct = products[i].relatedPeople;
        let notFound = true;
        for(let j = 0; j < iProduct.length && notFound; j++)
            if(myElementId == iProduct[j].id) {
                notFound = false;
                let article = document.createElement("article");
                let img = document.createElement("img");
                img.setAttribute("src", products[i].image);
                img.setAttribute("alt", products[i].name);
                img.setAttribute("class", "imageFooter");
                article.appendChild(img);
                let a = document.createElement("a");
                let name = document.createTextNode(products[i].name);
                a.appendChild(name);
                a.setAttribute("id", products[i].id);
                a.addEventListener('click', showProduct);
                article.appendChild(a);
                div1.appendChild(article);
            }
    }
    footer.appendChild(div1);

    let div2 = document.createElement("div");
    div2.setAttribute("class", "foot2");
    let p2 = document.createElement("p");
    let title2 = document.createTextNode("Entidades relacionadas");
    p2.appendChild(title2);
    div2.appendChild(p2);

    let entities = getFromLocalStorage("entities");
    for(let i = 0; i < entities.length; i++) {
        let iEntity = entities[i].relatedPeople;
        let notFound = true;
        for(let j = 0; j < iEntity.length && notFound; j++)
            if(myElementId == iEntity[j].id) {
                notFound = false;
                let article = document.createElement("article");
                let img = document.createElement("img");
                img.setAttribute("src", entities[i].image);
                img.setAttribute("alt", entities[i].name);
                img.setAttribute("class", "imageFooter");
                article.appendChild(img);
                let a = document.createElement("a");
                let name = document.createTextNode(entities[i].name);
                a.appendChild(name);
                a.setAttribute("id", entities[i].id);
                a.addEventListener('click', showEntity);
                article.appendChild(a);
                div2.appendChild(article);
            }
    }
    footer.appendChild(div2);
}

function loadRelatedWithEntities(myElement) {
    let footer = document.getElementById("footer");

    let div1 = document.createElement("div");
    div1.setAttribute("class", "foot1");
    let p1 = document.createElement("p");
    let title1 = document.createTextNode("Productos relacionados");
    p1.appendChild(title1);
    div1.appendChild(p1);

    let myElementId = myElement.id;
    let products = getFromLocalStorage("products");
    for(let i = 0; i < products.length; i++) {
        let iProduct = products[i].relatedEntities;
        let notFound = true;
        for(let j = 0; j < iProduct.length && notFound; j++)
            if(myElementId == iProduct[j].id) {
                notFound = false;
                let article = document.createElement("article");
                let img = document.createElement("img");
                img.setAttribute("src", products[i].image);
                img.setAttribute("alt", products[i].name);
                img.setAttribute("class", "imageFooter");
                article.appendChild(img);
                let a = document.createElement("a");
                let name = document.createTextNode(products[i].name);
                a.appendChild(name);
                a.setAttribute("id", products[i].id);
                a.addEventListener('click', showProduct);
                article.appendChild(a);
                div1.appendChild(article);
            }
    }
    footer.appendChild(div1);

    let div2 = document.createElement("div");
    div2.setAttribute("class", "foot2");
    let p2 = document.createElement("p");
    let title2 = document.createTextNode("Personas relacionadas");
    p2.appendChild(title2);
    div2.appendChild(p2);
    if(myElement.relatedPeople != undefined)
        for(let i = 0; i < myElement.relatedPeople.length; i++) {
            let article = document.createElement("article");
            let img = document.createElement("img");
            img.setAttribute("src", myElement.relatedPeople[i].image);
            img.setAttribute("alt", myElement.relatedPeople[i].name);
            img.setAttribute("class", "imageFooter");
            article.appendChild(img);
            let a = document.createElement("a");
            let name = document.createTextNode(myElement.relatedPeople[i].name);
            a.appendChild(name);
            a.setAttribute("id", myElement.relatedPeople[i].id);
            a.addEventListener('click', showPerson);
            article.appendChild(a);
            div2.appendChild(article);
        }
    footer.appendChild(div2);
}

function createProduct() {
    setLocalStorageNoStringify("myElementType", "productType");
    setLocalStorageNoStringify("action", "create");
    window.location.href = "createOrUpdateElement.html";
}

function createPerson() {
    setLocalStorageNoStringify("myElementType", "personType");
    setLocalStorageNoStringify("action", "create");
    window.location.href = "createOrUpdateElement.html";
}

function createEntity() {
    setLocalStorageNoStringify("myElementType", "entityType");
    setLocalStorageNoStringify("action", "create");
    window.location.href = "createOrUpdateElement.html";
}

function updateProduct(event) {
    let id = event.target.id;
    let products = getFromLocalStorage("products");
    let product = findElementById(products, id);
    setLocalStorage("myElement", product);
    setLocalStorageNoStringify("myElementType", "productType");
    setLocalStorageNoStringify("action", "update");
    window.location.href = "createOrUpdateElement.html";
}

function updatePerson(event) {
    let id = event.target.id;
    let people = getFromLocalStorage("people");
    let person = findElementById(people, id);
    setLocalStorage("myElement", person);
    setLocalStorageNoStringify("myElementType", "personType");
    setLocalStorageNoStringify("action", "update");
    window.location.href = "createOrUpdateElement.html";
}

function updateEntity(event) {
    let id = event.target.id;
    let entities = getFromLocalStorage("entities");
    let entity = findElementById(entities, id);
    setLocalStorage("myElement", entity);
    setLocalStorageNoStringify("myElementType", "entityType");
    setLocalStorageNoStringify("action", "update");
    window.location.href = "createOrUpdateElement.html";
}

function loadCreateOrUpdateElement() {
    let myElementType =  getFromLocalStorageNoParse("myElementType");
    let action = getFromLocalStorageNoParse("action");
    let form = document.getElementById("createOrUpdateElementForm");
    if(action === "create") {
        if(myElementType === "productType")
            form.innerHTML = '<h2>Crear producto</h2>';
        else if(myElementType === "personType")
            form.innerHTML = '<h2>Crear persona</h2>';
        else
            form.innerHTML = '<h2>Crear entidad</h2>';
        form.innerHTML += '<label for = "Name" class = "label">Nombre</label>';
        form.innerHTML += '<input id = "Name" class = "input" type = "text" name = "Name"/>';
        form.innerHTML += '<label for = "Birth" class = "label">Fecha de nacimiento</label>';
        form.innerHTML += '<input id = "Birth" class = "input" type = "date" name = "Birth"/>';
        form.innerHTML += '<label for = "Death" class = "label">Fecha de defunción</label>';
        form.innerHTML += '<input id = "Death" class = "input" type = "date" name = "Death"/>';
        form.innerHTML += '<label for = "Image" class = "label">Imagen</label>';
        form.innerHTML += '<input id = "Image" class = "input" type = "text" name = "Image"/>';
        form.innerHTML += '<label for = "Wiki" class = "label">Wiki</label>';
        form.innerHTML += '<input id = "Wiki" class = "input" type = "text" name = "Wiki"/>';
        if(myElementType === "entityType" || myElementType === "productType") {
            let people = getFromLocalStorage("people");
            if(people.length > 0) {
                form.innerHTML += '<p>Personas relacionadas</p>';
                for(let i = 0; i < people.length; i++) 
                    form.innerHTML += '<article><input id="p' + i + '" type="checkbox"/>' + people[i].name + '</article><br>';
            }
            if(myElementType === "productType") {
                let entities = getFromLocalStorage("entities");
                if(entities.length > 0) {
                    form.innerHTML += '<p>Entidades relacionadas</p>';
                    for(let i = 0; i < entities.length; i++) 
                        form.innerHTML += '<article><input id="e' + i + '" type="checkbox"/>' + entities[i].name + '</article><br>';
                }
            }
        }
        form.innerHTML += '<br>';
        form.innerHTML += '<input type = "button" name = "Submit" value = "Guardar" onclick = "editElement();"/>';
    }
    else if(action === "update") {
        let myElement = getFromLocalStorage("myElement");
        if(myElementType === "productType")
            form.innerHTML = '<h2>Editar producto</h2>';
        else if(myElementType === "personType")
            form.innerHTML = '<h2>Editar persona</h2>';
        else
            form.innerHTML = '<h2>Editar entidad</h2>';
        form.innerHTML += '<label for = "Name" class = "label">Nombre</label>';
        form.innerHTML += '<input id = "Name" class = "input" type = "text" name = "Name" value = "' + myElement.name + '"/>';
        form.innerHTML += '<label for = "Birth" class = "label">Fecha de nacimiento</label>';
        let dateArray = myElement.birth.split('/');
        let finalDate = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
        form.innerHTML += '<input id = "Birth" class = "input" type = "date" name = "Birth" value = "' + finalDate + '"/>';
        form.innerHTML += '<label for = "Death" class = "label">Fecha de defunción</label>';
        if(myElement.death == "")
            form.innerHTML += '<input id = "Death" class = "input" type = "date" name = "Death"/>';
        else {
            dateArray = myElement.death.split('/');
            finalDate = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
            form.innerHTML += '<input id = "Death" class = "input" type = "date" name = "Death" value = "' + finalDate + '"/>';
        }
        form.innerHTML += '<label for = "Image" class = "label">Imagen</label>';
        form.innerHTML += '<input id = "Image" class = "input" type = "text" name = "Image" value = "' + myElement.image + '"/>';
        form.innerHTML += '<label for = "Wiki" class = "label">Wiki</label>';
        form.innerHTML += '<input id = "Wiki" class = "input" type = "text" name = "Wiki" value = "' + myElement.wiki + '"/>';
        if(myElementType === "entityType" || myElementType === "productType") {
            let people = getFromLocalStorage("people");
            if(people.length > 0) {
                form.innerHTML += '<p>Personas relacionadas</p>';
                for(let i = 0; i < people.length; i++) {
                    let notFound = true;
                    for(let j = 0; j < myElement.relatedPeople.length && notFound; j++)
                        if(myElement.relatedPeople[j].id == people[i].id) {
                            notFound = false;
                            form.innerHTML += '<article><input id="p' + i + '" type="checkbox" checked="checked"/>' + people[i].name + '</article><br>';
                        }
                    if(notFound)
                        form.innerHTML += '<article><input id="p' + i + '" type="checkbox"/>' + people[i].name + '</article><br>';
                }
            }
            if(myElementType === "productType") {
                let entities = getFromLocalStorage("entities");
                if(entities.length > 0) {
                    form.innerHTML += '<p>Entidades relacionadas</p>';
                    for(let i = 0; i < entities.length; i++) {
                        let notFound = true;
                        for(let j = 0; j < myElement.relatedEntities.length && notFound; j++)
                            if(myElement.relatedEntities[j].id == entities[i].id) {
                                notFound = false;
                                form.innerHTML += '<article><input id="e' + i + '" type="checkbox" checked="checked"/>' + entities[i].name + '</article><br>';
                            }
                        if(notFound)
                            form.innerHTML += '<article><input id="e' + i + '" type="checkbox"/>' + entities[i].name + '</article><br>';
                    }
                }
            }
        }
        form.innerHTML += '<br>';
        form.innerHTML += '<input type = "button" name = "Submit" value = "Guardar" onclick = "editElement();"/>';
        setLocalStorage("myElementId", myElement.id);
    }
    else
        alert("Error: action erróneo.");
}

function editElement() {
    let myElementType = getFromLocalStorageNoParse("myElementType");
    let action = getFromLocalStorageNoParse("action");
    let name = document.getElementById("Name").value;
    let birth = document.getElementById("Birth").value;
    let death = document.getElementById("Death").value;
    let image = document.getElementById("Image").value;
    let wiki = document.getElementById("Wiki").value;
    if(validateElement(name, birth, image, wiki)) {
        let dateArray = birth.split('-');
        birth = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0];
        if(death != "") {
            dateArray = death.split('-');
            death = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0];
        }
        if(action === "create") {
            if(myElementType === "productType") {
                let relatedPeople = [];
                let people = getFromLocalStorage("people");
                for(let i = 0; i < people.length; i++) {
                    let iPerson = document.getElementById("p" + i);
                    if(iPerson.checked)
                        relatedPeople.push(people[i]);
                }
                let relatedEntities = [];
                let entities = getFromLocalStorage("entities");
                for(let i = 0; i < entities.length; i++) {
                    let iEntity = document.getElementById("e" + i);
                    if(iEntity.checked)
                        relatedEntities.push(entities[i]);
                }
                let newProduct = new Product(name, birth, death, image, wiki, relatedPeople, relatedEntities);
                let products = getFromLocalStorage("products");
                products.push(newProduct);
                setLocalStorage("products", products);
            }
            else if(myElementType === "personType") {
                let newPerson = new Person(name, birth, death, image, wiki);
                let people = getFromLocalStorage("people");
                people.push(newPerson);
                setLocalStorage("people", people);
            }
            else if(myElementType === "entityType") {
                let relatedPeople = [];
                let people = getFromLocalStorage("people");
                for(let i = 0; i < people.length; i++) {
                    let iPerson = document.getElementById("p" + i);
                    if(iPerson.checked)
                        relatedPeople.push(people[i]);
                }
                let newEntity = new Entity(name, birth, death, image, wiki, relatedPeople);
                let entities = getFromLocalStorage("entities");
                entities.push(newEntity);
                setLocalStorage("entities", entities);
            }
            else
                alert("Error: elementType erróneo.");
        }
        else if(action === "update") {
            let myElementId = getFromLocalStorage("myElementId");
            if(myElementType === "productType") {
                let relatedPeople = [];
                let people = getFromLocalStorage("people");
                for(let i = 0; i < people.length; i++) {
                    let iPerson = document.getElementById("p" + i);
                    if(iPerson.checked)
                        relatedPeople.push(people[i]);
                }
                let relatedEntities = [];
                let entities = getFromLocalStorage("entities");
                for(let i = 0; i < entities.length; i++) {
                    let iEntity = document.getElementById("e" + i);
                    if(iEntity.checked)
                        relatedEntities.push(entities[i]);
                }
                let products = getFromLocalStorage("products");
                let notFound = true;
                for(let i = 0; i < products.length && notFound; i++)
                    if(myElementId == products[i].id) {
                        products[i].name = name;
                        products[i].birth = birth;
                        products[i].death = death;
                        products[i].image = image;
                        products[i].wiki = wiki;
                        products[i].relatedPeople = relatedPeople;
                        products[i].relatedEntities = relatedEntities;
                        notFound = false;
                    }
                setLocalStorage("products", products);
            }
            else if(myElementType === "personType") {
                let people = getFromLocalStorage("people");
                let notFound = true;
                for(let i = 0; i < people.length && notFound; i++)
                    if(myElementId == people[i].id) {
                        people[i].name = name;
                        people[i].birth = birth;
                        people[i].death = death;
                        people[i].image = image;
                        people[i].wiki = wiki;
                        notFound = false;
                    }
                setLocalStorage("people", people);
                let entities = getFromLocalStorage("entities");
                for(let i = 0; i < entities.length; i++) {
                    let notFound = true;
                    for(let j = 0; j < entities[i].relatedPeople.length && notFound; j++) {
                        if(myElementId == entities[i].relatedPeople[j].id) {
                            entities[i].relatedPeople[j].name = name;
                            entities[i].relatedPeople[j].birth = birth;
                            entities[i].relatedPeople[j].death = death;
                            entities[i].relatedPeople[j].image = image;
                            entities[i].relatedPeople[j].wiki = wiki;
                            notFound = false;
                        }
                    }
                }
                setLocalStorage("entities", entities);
                let products = getFromLocalStorage("products");
                for(let i = 0; i < products.length; i++) {
                    let notFound = true;
                    for(let j = 0; j < products[i].relatedPeople.length && notFound; j++) {
                        if(myElementId == products[i].relatedPeople[j].id) {
                            products[i].relatedPeople[j].name = name;
                            products[i].relatedPeople[j].birth = birth;
                            products[i].relatedPeople[j].death = death;
                            products[i].relatedPeople[j].image = image;
                            products[i].relatedPeople[j].wiki = wiki;
                            notFound = false;
                        }
                    }
                    for(let j = 0; j < products[i].relatedEntities.length; j++)
                        if(products[i].relatedEntities[j].relatedPeople != []) {
                            notFound = true;
                            for(let k = 0; k < products[i].relatedEntities[j].relatedPeople.length; k++) {
                                if(myElementId == products[i].relatedEntities[j].relatedPeople[k].id) {
                                    products[i].relatedEntities[j].relatedPeople[k].name = name;
                                    products[i].relatedEntities[j].relatedPeople[k].birth = birth;
                                    products[i].relatedEntities[j].relatedPeople[k].death = death;
                                    products[i].relatedEntities[j].relatedPeople[k].image = image;
                                    products[i].relatedEntities[j].relatedPeople[k].wiki = wiki;
                                    notFound = false;
                                }
                        }
                    }
                }
                for(let i = 0; i < products.length; i++) {
                    let notFound = true;
                    for(let j = 0; j < products[i].relatedPeople.length && notFound; j++) {
                        if(myElementId == products[i].relatedPeople[j].id) {
                            products[i].relatedPeople[j].name = name;
                            products[i].relatedPeople[j].birth = birth;
                            products[i].relatedPeople[j].death = death;
                            products[i].relatedPeople[j].image = image;
                            products[i].relatedPeople[j].wiki = wiki;
                            notFound = false;
                        }
                    }
                }
                setLocalStorage("products", products);
            }
            else if(myElementType === "entityType") {
                let relatedPeople = [];
                let people = getFromLocalStorage("people");
                for(let i = 0; i < people.length; i++) {
                    let iPerson = document.getElementById("p" + i);
                    if(iPerson.checked)
                        relatedPeople.push(people[i]);
                }
                let entities = getFromLocalStorage("entities");
                let notFound = true;
                for(let i = 0; i < entities.length && notFound; i++)
                    if(myElementId == entities[i].id) {
                        entities[i].name = name;
                        entities[i].birth = birth;
                        entities[i].death = death;
                        entities[i].image = image;
                        entities[i].wiki = wiki;
                        entities[i].relatedPeople = relatedPeople;
                        notFound = false;
                    }
                setLocalStorage("entities", entities);
                let products = getFromLocalStorage("products");
                for(let i = 0; i < products.length; i++) {
                    let notFound = true;
                    for(let j = 0; j < products[i].relatedEntities.length && notFound; j++) {
                        if(myElementId == products[i].relatedEntities[j].id) {
                            products[i].relatedEntities[j].name = name;
                            products[i].relatedEntities[j].birth = birth;
                            products[i].relatedEntities[j].death = death;
                            products[i].relatedEntities[j].image = image;
                            products[i].relatedEntities[j].wiki = wiki;
                            products[i].relatedEntities[j].relatedPeople = relatedPeople;
                            notFound = false;
                        }
                    }
                }
                setLocalStorage("products", products);
            }
        }
        else
            alert("Error: action erróneo.");
        window.location.href = "index.html";
    }
    else {
        alert("Error: Todos los campos son obligatorios");
        loadCreateOrUpdateElement();
    }
}

function validateElement(name, birth, image, wiki) {
    return (name && birth && image && wiki);
}

function deleteProduct(event) {
    let id = event.target.id;
    let products = getFromLocalStorage("products");
    let notFound = true;
    for(let i = 0; i < products.length && notFound; i++)
        if(products[i].id == id) {
            products.splice(i, 1);
            notFound = false;
        }
    setLocalStorage("products", products);
    loadIndex();
}

function deletePerson(event) {
    let id = event.target.id;
    let people = getFromLocalStorage("people");
    let notFound = true;
    for(let i = 0; i < people.length && notFound; i++)
        if(people[i].id == id) {
            people.splice(i, 1);
            notFound = false;
        }
    setLocalStorage("people", people);
    let entities = getFromLocalStorage("entities");
    for(let i = 0; i < entities.length; i++) {
        let notFound = true;
        for(let j = 0; j < entities[i].relatedPeople.length && notFound; j++) {
            if(id == entities[i].relatedPeople[j].id) {
                entities[i].relatedPeople.splice(j, 1);
                notFound = false;
            }
        }
    }
    setLocalStorage("entities", entities);
    let products = getFromLocalStorage("products");
    for(let i = 0; i < products.length; i++) {
        let notFound = true;
        for(let j = 0; j < products[i].relatedPeople.length && notFound; j++) {
            if(id == products[i].relatedPeople[j].id) {
                products[i].relatedPeople.splice(j, 1);
                notFound = false;
            }
        }
    }
    setLocalStorage("products", products);
    loadIndex();
}

function deleteEntity(event) {
    let id = event.target.id;
    let entities = getFromLocalStorage("entities");
    let notFound = true;
    for(let i = 0; i < entities.length && notFound; i++)
        if(entities[i].id == id) {
            entities.splice(i, 1);
            notFound = false;
        }
    setLocalStorage("entities", entities);
    let products = getFromLocalStorage("products");
    for(let i = 0; i < products.length; i++) {
        let notFound = true;
        for(let j = 0; j < products[i].relatedEntities.length && notFound; j++) {
            if(id == products[i].relatedEntities[j].id) {
                products[i].relatedEntities.splice(j, 1);
                notFound = false;
            }
        }
    }
    setLocalStorage("products", products);
    loadIndex();
}

function getFromLocalStorageNoParse(key) {
    if(window.localStorage.getItem(key))
        return (window.localStorage.getItem(key));
    else
        alert("Error: " + key + " no está en localStorage.");
}

function getFromLocalStorage(key) {
    if(window.localStorage.getItem(key))
        return (JSON.parse(window.localStorage.getItem(key)));
    else
        alert("Error: " + key + " no está en localStorage.");
}

function setLocalStorageNoStringify(key, value) {
    window.localStorage.setItem(key, value);
}

function setLocalStorage(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
}

function findElementById(array, id) {
    for(let i = 0; i < array.length; i++)
        if(array[i].id == id)
            return array[i];
    alert("Error: el elemento con id " + id + " no está en " + array + ".");
    return null;
}