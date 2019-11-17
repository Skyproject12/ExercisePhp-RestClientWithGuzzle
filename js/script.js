
function search_movie(){ 
    $('#movie-list').html(''); 
    // membuat setiap di klik maka html akan di set devalut kosong
    $.ajax({
        // get public api 
        url:'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            // set key 
            'apiKey':'d0118fb2', 
            // mengambil inputan dari id search-input
            's': $('#search_input').val()
        }, 
        success: function(result){
            console.log(result.Response);
            // ketika response true 
            if(result.Response== "True"){  
                // mengambil data pada hasil json   
                let movies= result.Search;
                // append the data in the card  
                $.each(movies, function(i, data){
                    $('#movie-list').append(`
                        <div class="col-md-4">
                        <div class="card" >
                            <img src=" ` + data.Poster + ` " class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">`+ data.Title+ `</h5>
                                <h6 class="card-subtitle mb-2 text-muted">`+data.Year+`</h6>
                                <a href="#" class="card-link see-detail" data-toggle="modal" data-id="`+data.imdbID+`" data-target="#exampleModal">See Detail</a>
                            </div>
                        </div>
                    </div>
                    `);
                }); 

                $('#search_input').val(""); 
                // ketika selesai di klik maka input data akan di hapus 
            } 
            else{ 
                $('#movie-list').html(`
                <div class="col">
                    <h1 class="text-center">Movie Not Found</h1> 
                </div>
                `);
            }            
        }
    });
}
$('#search_button').on('click', function(){

   search_movie();

});

// ketika kita berada di search input dan melakukan keyup 
$('#search_input').on('keyup', function(event){ 
    // keycode mengambil key dalam keyboard lalu menerjemahkan kedalam kode
    if(event.keyCode === 27){
        search_movie();
    }
}); 
// jquery carikan saya element dengan id movie-list lalu setelah di klik jika terdapat element see-detail maka
$('#movie-list').on('click', '.see-detail',  function(){
    // mengambil data pada class ini berupa id 
    console.log($(this).data('id')); 
    $.ajax({
        url: 'http://omdbapi.com',
        dataType: 'json',
        type: 'get', 
        data: {
            'apikey':'d0118fb2',
            'i': $(this).data('id')
        },
        // lakukan select api berdasarkan id 
        success: function(movie){ 
            // ketika response true
            if(movie.Response === "True"){
                // ganti html modal 
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+movie.Poster+`" class="image-fluid">
                            </div>  
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>`+ movie.Title+`</h3></li>
                                    <li class="list-group-item">Release`+ movie.Released+`</li>
                                    <li class="list-group-item">Genre`+ movie.Genre+`</li>
                                    <li class="list-group-item">Director`+ movie.Director+`</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `)
            }
        }
    });
});