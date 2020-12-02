import psycopg2
try:
    connection = psycopg2.connect(user = "postgres",
                                  password = "costa",
                                  host = "localhost",
                                  port = "5432",
                                  database = "notatechdatabase")

    cursor = connection.cursor()
    # Print PostgreSQL Connection properties
    print ( connection.get_dsn_parameters(),"\n")

    # Print PostgreSQL version
    command = ("insert into users (email, first_name, last_name, password) VALUES (%s, %s, %s, %s)" % ("'email@email.com'", "'John'", "'Doe'", "'password'"))
    cursor.execute(command)
    connection.commit()
    print("Created user")

except (Exception, psycopg2.Error) as error :
    print ("Error while connecting to PostgreSQL", error)
finally:
    #closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")
