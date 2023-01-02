 <?php
//if(isset($_POST['text']))
//{
 //   echo "<p> Hi,". $_POST['text']."</p>";
//}
if(isset($_POST['number']))
{   $number= $_POST['number'];
    for( $i=1; $i<=10; $i++)
    {
        $multiply= $number*$i;
        echo " $number","*","$i","=","$multiply", "<br/>";
    }
}
?>