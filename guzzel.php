<?php
  require 'vendor/autoload.php';
  use GuzzleHttp\Client;

  // initial client
  $client= new Client();
  // request into api
  $response= $client->request('GET','http://omdbapi.com',[
    'query' =>[
      'apikey'=> 'd0118fb2',
      's'=>'transformers'
    ]
  ]);
  // get response with json format 
  $result= $response->getBody()->getContents(); 
  // convert json to format array 
  $convert= json_decode($result, true); 
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <!-- melakukan perulangan untuk mengambil data  -->
  <?php 
    foreach($convert['Search'] as $movie) : 
  ?>
    <ul>
      <li>Title: <?= $movie['Title']; ?></li>
      <li>Year : 2007<?= $movie['Year'];?></li>
      <li><img src="<?php echo($movie['Poster']);?>" width="80"></li>
    </ul>
  <?php 
    endforeach;
  ?>
</body>
</html>