var db = firebase.firestore();
async function submitproduct() {
    var category = document.getElementById("category").value
    var name = document.getElementById("name").value
    var code = document.getElementById("code").value
    var file = document.querySelector("#file").files
    var description = document.getElementById("description").value

    if (category == "undefined") {
        alert("Product category Is Required..")
    } else if (name == "") {
        alert("Product Name Is Required..")
    } else if (code == "") {
        alert("Product Code Is Required..")
    } else if (file.length == 0) {
        alert("Product Image Is Required..")
    } else {
        document.getElementById("submitbtnproduct").innerHTML = " <span class='spinner-border spinner-border-sm mr-2' role='status'style='padding: 7px;' aria-hidden='true'></span>Please Wait..."
        let file11 = new Promise((resolve, reject) => {
            var storageRef = firebase.storage().ref("profile/" + file[0].name);
            storageRef.put(file[0]).then(function (snapshot) {
                storageRef.getDownloadURL().then(function (url) {  //img download link ah ketakiradhu
                    setTimeout(() => resolve(url), 1000)
                })
            });
        });
        var imgurl = await file11
        var data = {
            picture: imgurl,
            name: name,
            code: code,
            category: category,
            description: description
        }
        var productdata = await axios.post('http://localhost:1000/product/', data).then((res) => { return res.data })
        console.log(productdata)
        if (productdata !== undefined) {
            alert("Product Added Successfully..")
            window.location.reload()
        }
    }

}


getproduct = async () => {
    var productdata = await axios.get('http://localhost:1000/product/').then((res) => { return res.data })
    var data = []
    for (var i = 0; i < productdata.length; i++) {
        data.push(productdata[i])
        document.getElementById("productlist").innerHTML += `
        <div class="col-md-3 mt-3 productlist">
        <div class="shadow-lg bg-white rounded-md overflow-hidden max-w-xs mx-auto">
            <img class="w-full h-52 object-cover"
                src="${productdata[i].picture}"
                alt="Hotel Room">
            <div class="py-7 px-6">
                <div class="flex justify-between items-end">
                    <span><b>${productdata[i].name}</b></span>
                    <button
                        class="text-blue-500 capitalize border border-gray-300 rounded-md py-1 px-3">${productdata[i].code}</button>
                </div>
                <hr class="mt-3 mb-5">
                <p>${productdata[i].description}</p>
                <span class="text-gray-400 text-sm mt-2.5 mb-6 block">${productdata[i].category}<span></span></span>
            </div>
        </div>
    </div>
        `
    }
    if (data.length >4) {
        var items = $("#productlist .productlist");
        var numItems = data.length;
        var perPage = 4;
        items.slice(perPage).hide();
        $('#pagination-container').pagination({
            items: numItems,
            itemsOnPage: perPage,
            prevText: "&laquo;",
            nextText: "&raquo;",
            onPageClick: function (pageNumber) {
                var showFrom = perPage * (pageNumber - 1);
                var showTo = showFrom + perPage;
                items.hide().slice(showFrom, showTo).show();
            }
        });
    }
}

getproduct()