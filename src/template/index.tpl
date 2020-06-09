<!DOCTYPE html>
<html lang="en">
<head>
     <title>当前目录树</title>
     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
     <style>
          ul {
               list-style: none;
          }
     </style>
</head>
<body>
     <ul class="dir_list">
          <li>{{url}}</li>
          {{#each dirs}}
               <li>
                 <a href="{{url}}">{{name}}</a>
               </li>
          {{/each}}
     </ul>
</body>
</html>
