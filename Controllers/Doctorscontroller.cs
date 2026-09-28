using Microsoft.AspNetCore.Mvc;

namespace DoctorAppointment.Controllers
{
    public class DoctorsController : Controller
    {
        // Department page
        public IActionResult Index()
        {
            return View();
        }

        // Show doctors for each department
        public IActionResult Department(string name)
        {
            var doctors = name switch
            {
                "Medicine" => new[]
                {
                    new { Name = "Dr. Ahmed Rahman", Qualification = "MBBS, MD (Medicine)", Experience = "8 years", Fee = "₩30,000" },
                    new { Name = "Dr. Mohammad Karim", Qualification = "MBBS, FCPS (Medicine)", Experience = "6 years", Fee = "₩25,000" }
                },

                "Cardiology" => new[]
                {
                    new { Name = "Dr. Hasan Mahmud", Qualification = "MBBS, MD (Cardiology)", Experience = "10 years", Fee = "₩40,000" },
                    new { Name = "Dr. Fahim Ahmed", Qualification = "MBBS, FCPS (Cardiology)", Experience = "7 years", Fee = "₩35,000" }
                },

                "Dental" => new[]
                {
                    new { Name = "Dr. Sara Khan", Qualification = "BDS, MDS", Experience = "7 years", Fee = "₩25,000" },
                    new { Name = "Dr. Nusrat Jahan", Qualification = "BDS, Dental Surgery", Experience = "5 years", Fee = "₩22,000" }
                },

                "Gynecology" => new[]
                {
                    new { Name = "Dr. Ayesha Rahman", Qualification = "MBBS, FCPS (Gynecology)", Experience = "9 years", Fee = "₩35,000" },
                    new { Name = "Dr. Maria Akter", Qualification = "MBBS, MD (Gynecology)", Experience = "6 years", Fee = "₩30,000" }
                },

                "Surgery" => new[]
                {
                    new { Name = "Dr. Imran Hossain", Qualification = "MBBS, FCPS (Surgery)", Experience = "12 years", Fee = "₩45,000" },
                    new { Name = "Dr. Rakib Hasan", Qualification = "MBBS, MS (Surgery)", Experience = "8 years", Fee = "₩40,000" }
                },

                _ => new[]
                {
                    new { Name = "Doctor Not Found", Qualification = "", Experience = "", Fee = "" }
                }
            };

            ViewBag.Department = name;
            ViewBag.Doctors = doctors;

            return View();
        }

        // Booking page
        [HttpGet]
        public IActionResult Book(string department, string doctor)
        {
            ViewBag.Department = department;
            ViewBag.Doctor = doctor;

            return View();
        }

        // After booking
        [HttpPost]
        public IActionResult Book(
            string department,
            string doctor,
            string appointmentDate,
            string time)
        {
            ViewBag.Department = department;
            ViewBag.Doctor = doctor;
            ViewBag.AppointmentDate = appointmentDate;
            ViewBag.Time = time;

            return View("Confirmation");
        }
    }
}