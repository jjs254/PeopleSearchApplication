using PeopleSearchApp.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace PeopleSearchTests
{
    public class PeopleSearchFixture
    {
        public List<Person> testPeople = new List<Person>
        {
            new Person("Bob", "Smith", "1111 Test", "Charleston", "SC", 32424, 45, "Some interests", "url/test"),
            new Person("Amy", "Smith", "2222 Test", "Salt Lake City", "UT", 89789, 32, "Some interests", "url/test"),
            new Person("Bob", "Allen", "3333 Test", "Las Vegas", "NV", 23456, 90, "Some interests", "url/test")
        };

        public PeopleSearchFixture() { }
    }
}
