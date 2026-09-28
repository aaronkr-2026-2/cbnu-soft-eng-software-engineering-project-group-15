using Microsoft.AspNetCore.Mvc;

namespace doctor_appointment.Controllers
{
    public class AppointmentsController : Controller
    {
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(string PatientName, string Phone, string DoctorName, DateTime AppointmentDate)
        {
            ViewBag.Message = "Your appointment has been booked successfully!";
            return View();
        }
    }
}