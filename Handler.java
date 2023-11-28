import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;

public class Handler implements HttpHandler {

  @Override
  public void handle(HttpExchange t) throws IOException {
    if (t.getRequestURI().toString().equals("/test")) {
      File main_html = new File("index.html");
      t.sendResponseHeaders(200, main_html.length());
      OutputStream os = t.getResponseBody();
      os.write(main_html.toString().getBytes());
      os.close();
    } else if (t.getRequestURI().toString().equals("/test2")) {
      File main_html = new File("index2.html");
      t.sendResponseHeaders(200, main_html.length());
      OutputStream os = t.getResponseBody();
      os.write(main_html.toString().getBytes());
      os.close();
    }
    System.out.print("done");
  }
}
