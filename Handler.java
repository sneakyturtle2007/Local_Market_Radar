import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStream;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class Handler implements HttpHandler{
        @Override
        public void handle(HttpExchange t) throws IOException {

            String main_html;

            if(t.getRequestURI().toString().equals("/test")){

                BufferedReader bf = new BufferedReader(new FileReader("FrontEnd\\index.html"));
                StringBuilder sb = new StringBuilder();
                String line = bf.readLine();
                while (line != null) {
                    sb.append(line).append("\n");
                    line = bf.readLine();
                }
                main_html = sb.toString();
                bf.close();

            }else{

                BufferedReader bf = new BufferedReader(new FileReader("FrontEnd\\Account.html"));
                StringBuilder sb = new StringBuilder();
                String line = bf.readLine();
                while (line != null) {
                    sb.append(line).append("\n");
                    line = bf.readLine();
                }
                main_html = sb.toString();
                bf.close();
                
            }
                    
           
            t.sendResponseHeaders(200, main_html.getBytes().length);
            OutputStream os = t.getResponseBody();
            os.write(main_html.toString().getBytes());
            os.close();
            System.out.print("Connection");
    }
}