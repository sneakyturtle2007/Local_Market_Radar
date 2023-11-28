import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

public class ServerMain {

  public static void main(String[] args) throws IOException {
    HttpServer httpServer = HttpServer.create(
      new InetSocketAddress("localhost", 8000),
      0
    );
    httpServer.createContext("/test", new Handler());
    httpServer.createContext("/test2", new Handler());
    httpServer.start();
  }
}
