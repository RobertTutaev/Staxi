<?php
/**
 * @author <Robert Tutaev>
 * @package test
 *
 */
#setlocale(LC_ALL, 'ru_RU.CP1251', 'rus_RUS.CP1251', 'Russian_Russia.1251');

class Bootstrap
{
        const message_error_not_specified   = 'ODBC config, login, password, DBF-file, dump-file or table name not specified!';
        const message_error_file_not_found  = 'DBF-file %s not found or not readable!';
        
        protected static $Config;
        protected static $Login;
        protected static $Password;
        protected static $FileName;
        protected static $DumpFileName;
        protected static $TableName;
        
	public static function main($argv)
	{
                // 1. If not specified
                if(count($argv)<7)
                {
                    throw new Exception(self::message_error_not_specified);
                }                
                
                self::$Config       = $argv[1];
                self::$Login        = $argv[2];
                self::$Password     = $argv[3];
		self::$FileName     = $argv[4];
                self::$DumpFileName = $argv[5];
                self::$TableName    = $argv[6];
                
                // 2. If dbf file not found or not readable
                if(!(file_exists(self::$FileName) && is_readable(self::$FileName)))
                {
                    throw new Exception(sprintf(self::message_error_file_not_found, self::$FileName));
                }
                
                // 3. If dump file is exists then delete
                if(file_exists(self::$DumpFileName))
                {
                    unlink(self::$DumpFileName);
                }
                
                // 4. Create dump file
                self::CreateDump();
	}
        
        /* Create dump file */
        protected static function CreateDump()
        {
            $sql    = 'SELECT * FROM '.self::$FileName;
            $odbc   = odbc_connect(self::$Config, self::$Login, self::$Password);
            $query  = odbc_exec($odbc, $sql) or die (odbc_errormsg());            
            $fl     = fopen(self::$DumpFileName, 'c');
            
            while($row = odbc_fetch_array($query))
            {
                
                $keys   = '';
                $values = '';                
                foreach ($row as $k => $v) {
                    $keys   = $keys.', '.$k;
                    $values = $values.', \''.$v.'\'';                    
                }
                
                fwrite($fl, 'insert into '.self::$TableName.' ('.substr($keys,2).') values ('.substr($values,2).');'.PHP_EOL);
            }
            
            fclose($fl);
            
            odbc_close($odbc);
        }
        
}

Bootstrap::main($argv);