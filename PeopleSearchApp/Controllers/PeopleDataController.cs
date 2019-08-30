using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PeopleSearchApp.Models;
using PeopleSearchApp.Services;
using static System.Net.Mime.MediaTypeNames;

namespace PeopleSearchApp.Controllers
{
    [Route("api/[controller]")]
    public class PeopleDataController : Controller
    {
        private readonly IPeopleService _service;

        public PeopleDataController(IPeopleService service)
        {
            _service = service;
        }

        [HttpGet("[action]/{searchString}/{isSlow}")]
        public ActionResult<IEnumerable<Person>> People(string searchString, bool isSlow)
        {
            if (isSlow)
            {
                DateTime start = DateTime.Now;
                while (DateTime.Now.Subtract(start).Seconds < 10)
                {
                    System.Threading.Thread.Sleep(1);
                }
            }
            try
            {
                /* For now we will return everything within the search parameter because it will minimize calls to the database layer and allow
                    the client to cache results to keep search performance fast. If the people database got to the point where it exceeded 
                    1000-2000 records, we would most likely implement pagination in order to prevent massive overhead on the GET request. 
                    Given that the search feature changes what is returned on each keystroke,
                    we would probably accomplish this by ordering the data and adding in an offset parameter that is tied to how many records remained 
                    in the cache on the client. Until it gets to that point though, this is the most efficient way to reduce site latency.
                 */
                return Ok(_service.getPeople(searchString));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new List<Person>());
            }  
        }

        [HttpPost("[action]")]
        public ActionResult People([FromBody]Person person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                if (String.IsNullOrEmpty(person.ImageUrl))
                {
                    person.ImageUrl = "defaultProfile.jpg";
                }
                _service.savePerson(person);
                return Ok();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            
        }
    }
}
