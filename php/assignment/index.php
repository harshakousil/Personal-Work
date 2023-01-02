<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>index_page</title>
</head>
<body>
    <form method="post" action="submit.php" >
        <!-- <label for="Enter your text">
            <input type="text"  name="text" palceholder="Enter anything" />   
        </label><br><br> -->
        <label for="number"> number
            <input type="number" name="number" palceholder="enter the number"/>
        </label>
        <input type="submit" value="submit"/>
    </form>
</body>
<script>
    if(sessionStorage)
    {
        sessionStorage.setItem("last_name","parker");
        alert("Hi, " + localStorage.getItem("first_name") + " " + sessionStorage.getItem("last_name"));
    }
    
 else {
    alert("Sorry, your browser do not support session storage.");
}
</script>
</html>