using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace PeopleSearchApp.Models
{
    [DataContract]
    public class Person
    {
        [DataMember]
        public int PersonID { get; set; }

        [DataMember]
        public string FirstName { get; set; }

        [DataMember]
        public string LastName { get; set; }

        [DataMember]
        public string Address { get; set; }

        [DataMember]
        public string City { get; set; }

        [DataMember]
        public string State { get; set; }

        [DataMember]
        public int Zipcode { get; set; }

        [DataMember]
        public int Age { get; set; }

        [DataMember]
        public string Interests { get; set; }

        [DataMember]
        public string ImageUrl { get; set; }

        public Person() { }

        public Person(string firstName, string lastName, string address, string city, string state, int zipcode, int age, string interests, string imageUrl)
        {
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Address = address;
            this.City = city;
            this.State = state;
            this.Zipcode = zipcode;
            this.Age = age;
            this.Interests = interests;
            this.ImageUrl = imageUrl;
        }
    }
}
