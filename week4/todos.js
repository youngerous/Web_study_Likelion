var lis = document.querySelectorAll("li");

for(var i=0; i<lis.length; i++){
    lis[i].addEventListener("mouseover", function(){
        this.classList.add("mouseover");
        // this.style.color = "red"; 과 같음.
    });

    lis[i].addEventListener("mouseout", function(){
        this.classList.remove("mouseover");
    });

    lis[i].addEventListener("click", function(){
        this.classList.toggle("done")
    });
}
