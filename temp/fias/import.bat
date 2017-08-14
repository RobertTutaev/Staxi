call "c:\php\php.exe" -f ..\bootstrap.php "DRIVER={Microsoft dBase Driver (*.dbf)};SourceType=DBF;DriverID=21;Exclusive=NO;collate=Machine;" "" "" "ADDROB74.DBF" "addrob.sql" "addrob"
"C:\Program Files\MySQL\MySQL Server 5.6\bin\mysql.exe" -u root -p < use staxi < addrob.sql
pause