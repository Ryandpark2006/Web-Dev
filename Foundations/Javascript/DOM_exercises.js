{
    // #1 
    const body = document.body;

    const content = document.createElement("p");
    content.style["color"] = "red";
    content.textContent = "Hey I'm red!";

    body.appendChild(content);

    // #2
    const second = document.createElement("h3");
    second.style["color"] = "blue";
    second.textContent = "Hey I'm a blue h3!";

    body.appendChild(second);

    // #3
    const div = document.createElement("div");
    div.style["border-color"] = "black";
    div.style["border-width"] = "thin";
    div.style["background-color"] = "pink";
    div.innerHTML = "<h1>I'm in a div</h1>";

    const paragraph = document.createElement("p");
    paragraph.textContent = "ME TOO!";
    div.appendChild(paragraph);

    body.append(div);

}