document.addEventListener("DOMContentLoaded", start);


function start() {
    let filter = "alle";
    let sFilter = "";

    document.querySelectorAll(".filter").forEach(elm => {
        elm.addEventListener("click", filtreing);
    });




    function filtreing() {
        filter = this.getAttribute("data-filter");
        document.querySelectorAll(".filter").forEach(elm => {
            elm.classList.remove("valgt");
        });
        this.classList.add("valgt");
        console.log(filter);
        visRetter();
    }


    async function getJson() {
        let jsonData = await fetch("https://mandalskeawebspace.dk/claude_php/clean_up_spreadsheet.php?id=1lkRONBuY6aw9OQFQu0BTntldNM2rIx7kBxI73FJXDWg");
        retter = await jsonData.json();
        visRetter();
    }



    function visRetter() {
        document.querySelector("#retter").innerHTML = "";
        retter.forEach(retter => {
            if (filter == "alle" || filter == retter.kategori) {
                document.querySelector("#retter").innerHTML +=

                    `<div class="vis" data-retter="${retter.id}">
<div class="img" style="background-image:url(imgs/${retter.kategori}/${retter.billede}); background-size: cover; background-repeat: no-repeat; background-position: center;"></div>

<div class="tekst2">
 <h2>${retter.navn}</h2>
<p class="p2">${retter.pris},- </p>
<p class="kort">${retter.kort}</p>
</div>  
</div>`
            }
        });
        document.querySelectorAll(".vis").forEach(elms => {
            elms.addEventListener("click", singleViewFilter);
        });

        document.querySelector(".overlay").addEventListener("click", fjernsingle);
        document.querySelector(".single").addEventListener("click", fjernsingle);
    }

    function singleViewFilter() {
        sFilter = this.getAttribute("data-retter");
        console.log("Virk", this, sFilter);
        visRet();
    }


    function visRet() {
        document.querySelector(".single").innerHTML = "";
        retter.forEach(retter => {
            if (sFilter == retter.id) {
                document.querySelector(".single").classList.remove("hide");
                document.querySelector(".overlay").classList.remove("hide");


                document.querySelector(".single").innerHTML +=

                    `<div class="vis2" data-retter="${retter.id}" style="background-image: url(imgs/${retter.kategori}/${retter.billede});
    background-repeat: no-repeat;
    background-size: cover;">

<div class="tekst">
 <h2>${retter.navn}</h2>
<p>${retter.beskrivelse}</p>
<p><b>Pris:</b> ${retter.pris},-</p>

</div>  
</div>`


            }

        });



    }

    function fjernsingle() {
        document.querySelector(".single").classList.add("hide");
        document.querySelector(".overlay").classList.add("hide");
    }

    getJson();
}
