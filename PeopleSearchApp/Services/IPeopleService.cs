using PeopleSearchApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeopleSearchApp.Services
{
    public interface IPeopleService
    {
        List<Person> getPeople(string searchString);
        void savePerson(Person person);
    }
}
