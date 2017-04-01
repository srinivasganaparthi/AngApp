using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace AngularApp
{
  public class OrganizationController : ApiController
  {
    // GET api/<controller>
    [HttpGet]
    public IList<Employee> GetAllEmployees()
    {
      List<Employee> listEmployees = new List<Employee>();

      string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
      using (SqlConnection con = new SqlConnection(cs))
      {
        SqlCommand cmd = new SqlCommand("Select * from tblEmployees", con);
        con.Open();
        SqlDataReader rdr = cmd.ExecuteReader();
        while (rdr.Read())
        {
          Employee employee = new Employee();
          employee.id = Convert.ToInt32(rdr["Id"]);
          employee.name = rdr["Name"].ToString();
          employee.gender = rdr["Gender"].ToString();
          employee.salary = Convert.ToInt32(rdr["Salary"]);
          employee.dateOfBirth = rdr["DOB"].ToString();
          employee.city = rdr["City"].ToString();
          listEmployees.Add(employee);
        }
      }
      return listEmployees;
    }

    [HttpGet]
    public IList<Student> GetAllStudents()
    {
      List<Student> listStudents = new List<Student>();

      string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
      using (SqlConnection con = new SqlConnection(cs))
      {
        SqlCommand cmd = new SqlCommand("Select * from tblStudents", con);
        con.Open();
        SqlDataReader rdr = cmd.ExecuteReader();
        while (rdr.Read())
        {
          Student student = new Student();
          student.id = Convert.ToInt32(rdr["Id"]);
          student.name = rdr["Name"].ToString();
          student.gender = rdr["Gender"].ToString();
          student.city = rdr["City"].ToString();
          listStudents.Add(student);
        }
      }
      return listStudents;
    }


    [HttpPost]
    public void SaveStudent(Student student)
    {
      student.gender = (student.gender == "True" ? "Male" : "FeMale");
      string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
      using (SqlConnection con = new SqlConnection(cs))
      {
        con.Open();
        if (student.id > 0)
        {
          SqlCommand cmd = new SqlCommand("Update tblStudents Set Name = '" + student.name + "',Gender = '" + student.gender + "',City = '" + student.city + "' where id = " + student.id + "", con);
          cmd.ExecuteNonQuery();
        }
        else
        {
          SqlCommand cmd = new SqlCommand("insert into tblStudents(Name,Gender,City) values('" + student.name + "','" + student.gender + "','" + student.city + "')", con);
          cmd.ExecuteNonQuery();
        }
        con.Close();
      }
    }

    [HttpPost]
    public void SaveEmployee(Employee employee)
    {
      employee.gender = (employee.gender == "True" ? "1" : "2");
      string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
      using (SqlConnection con = new SqlConnection(cs))
      {
        con.Open();
        if (employee.id > 0)
        {
          SqlCommand cmd = new SqlCommand("Update tblEmployees Set Name = '" + employee.name + "',Gender = '" + employee.gender + "',City = '" + employee.city + "',Salary = '" + employee.salary + "',DOB = '" + employee.dateOfBirth + "' where id = " + employee.id + "", con);
          cmd.ExecuteNonQuery();
        }
        else
        {
          SqlCommand cmd = new SqlCommand("insert into tblEmployees(Name,Gender,Salary,DOB,City) values('" + employee.name + "','" + employee.gender + "','" + employee.salary + "','" + employee.dateOfBirth + "','" + employee.city + "')", con);
          cmd.ExecuteNonQuery();
        }
        con.Close();
      }
    }

    [HttpGet]
    public IList<Course> GetAllCourses()
    {
      List<Course> listCourses = new List<Course>();

      string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
      using (SqlConnection con = new SqlConnection(cs))
      {
        SqlCommand cmd = new SqlCommand("Select * from tblCourses", con);
        con.Open();
        SqlDataReader rdr = cmd.ExecuteReader();
        while (rdr.Read())
        {
          Course course = new Course();
          course.id = Convert.ToInt32(rdr["Id"]);
          course.name = rdr["Name"].ToString();

          listCourses.Add(course);
        }
      }
      return listCourses;
    }


    [HttpPost]
    public void SaveCourse(Course course)
    {
      string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
      using (SqlConnection con = new SqlConnection(cs))
      {
        con.Open();
        if (course.id > 0)
        {
          SqlCommand cmd = new SqlCommand("Update tblCourses Set Name = '" + course.name + "' where id = " + course.id + "", con);
          cmd.ExecuteNonQuery();
        }
        else
        {
          SqlCommand cmd = new SqlCommand("insert into tblCourses(Name) values('" + course.name + "')", con);
          cmd.ExecuteNonQuery();
        }
        con.Close();
      }
    }

    [HttpGet]
    public bool ValidateUser(string userName,string password)
    {
      string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
      using (SqlConnection con = new SqlConnection(cs))
      {
        con.Open();
        DataSet ds = new DataSet();
        SqlCommand cmd = new SqlCommand("select * from UserLogin where UserName = " + userName + " and Password = " + password + "", con);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        da.Fill(ds);
        if (ds.Tables[0].Rows.Count > 0)
        {
          con.Close();
          return true;
        }
        else
        {
          con.Close();
          return false;
        }
      }
    }
  }

}