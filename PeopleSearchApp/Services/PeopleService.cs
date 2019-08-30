using PeopleSearchApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeopleSearchApp.Services
{
    /// <summary>
    /// Database access for retrieving/saving people data. No unit tests needed because after mocking the context, no logic would remain to be tested
    /// </summary>
    public class PeopleService : IPeopleService
    {
        public List<Person> getPeople(string searchString)
        {
            using (var context = new PersonContext())
            {
                List<Person> results = context.People.Where(n => n.FirstName.Contains(searchString) || n.LastName.Contains(searchString)).ToList();
                return results;
            }
        }

        public void savePerson(Person person)
        {
            using (var context = new PersonContext())
            {
                context.People.Add(person);
                context.SaveChanges();
            }
        }
    }
}
