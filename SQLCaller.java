import java.sql.*;

//import com.mysql.cj.PerConnectionLRUFactory;
//import com.mysql.cj.x.protobuf.MysqlxPrepare.Prepare;

public class SQLCaller {

    private static String connectionStr;
    private static Connection connection;
    private static Statement statement;

    // initializes common varialbles
    public SQLCaller() throws SQLException {
        connectionStr = "jdbc:mysql://localhost:3306/main";

        connection = DriverManager.getConnection(connectionStr, "root", "root");

        statement = connection.createStatement();

    }

    // checks to see if the name is in the database
    public static boolean checkUserName(String username) throws SQLException {

        ResultSet resultSet = statement.executeQuery("select * from accounts");

        while (resultSet.next()) {
            if (username.equals(resultSet.getString(1))) {
                return true;
            }
            System.out.println(resultSet.getString(1));
        }
        return false;

    }

    // checks to see if the name and pass exist, and if they match;
    public static boolean checkPass(String pass, String username) throws SQLException {

        boolean passBool = false;
        boolean nameBool = false;
        int count = 0;
        int nameCount = 0;
        ResultSet resultSet = statement.executeQuery("select * from accounts");
        System.out.println(pass + " " + username);
        // loops through the results given by resultset to find the password that
        // matches pass, finds the index of the password that matches
        while (resultSet.next()) {
            if (pass.equals(resultSet.getString(2))) {
                passBool = true;
            } else if (passBool != true) {
                count++;
                System.out.println(resultSet.getString(2));
            }

        }
        resultSet = statement.executeQuery("select * from t");
        // checks if the name equals a name in the database, and that it matches with
        // the password given
        while (resultSet.next()) {
            if (username.equals(resultSet.getString(1)) && nameCount == count) {
                nameBool = true;
                // System.out.println(resultSet.getString(1));
            } else {
                nameCount++;
                System.out.println(resultSet.getString(1));
            }

        }
        // checks if name and pass are both true
        if (nameBool && passBool) {
            return true;
        } else {
            return false;
        }

    }

}