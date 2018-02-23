/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sa45.enrichment;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.Resource;
import javax.json.JsonException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import javax.ws.rs.core.MediaType;




@WebServlet(name = "AddToFavoriteServlet", urlPatterns = {"/addToFavorite"})
public class AddToFavoriteServlet extends HttpServlet {

    private static String query = "INSERT INTO gifphy.favorite (username, gifURL, title, author) VALUES (?, ?, ?, ?);";
    private Integer rowsAffected;
    
    @Resource(lookup = "jdbc/gifphy")
    private DataSource ds;
   

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException
    {           
        try (Connection conn = ds.getConnection())
        {
            String username = request.getParameter("username");
            String gifURL = request.getParameter("gifURL");
            String title = request.getParameter("title");
            String author = request.getParameter("author");
                    
            PreparedStatement ps = conn.prepareStatement(query);
            
            ps.setString(1, username);
            ps.setString(2, gifURL);
            ps.setString(3, title);
            ps.setString(4, author);

            rowsAffected = ps.executeUpdate();
                       
            conn.close();
        } 
        catch (SQLException ex) 
        {
            log(ex.getMessage());
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            return;
        } 
       
        // set status code
        response.setStatus(HttpServletResponse.SC_OK);
        
        // set media type
        response.setContentType(MediaType.TEXT_HTML);
        
        try (PrintWriter out = response.getWriter()) 
        {           
           out.println(rowsAffected);          
        }
    }


    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
