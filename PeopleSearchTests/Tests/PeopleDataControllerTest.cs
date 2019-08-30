using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using PeopleSearchApp.Services;
using PeopleSearchApp.Controllers;
using PeopleSearchApp.Models;
using System;
using System.Collections.Generic;
using Xunit;

namespace PeopleSearchTests
{
    public class PeopleDataController_Test
    {
        private readonly PeopleDataController _controller;
        private Mock<IPeopleService> _moqService;
        private PeopleSearchFixture _fixture;

        public PeopleDataController_Test()
        {
            _moqService = new Mock<IPeopleService>();
            _controller = new PeopleDataController(_moqService.Object);
            _fixture = new PeopleSearchFixture();
        }

        [Fact]
        public void PeopleGet_TestFast()
        {
            _moqService.Setup(m => m.getPeople(It.IsAny<string>())).Returns(_fixture.testPeople);
            var result = _controller.People("test", false).Result as ObjectResult;

            var items = Assert.IsType<List<Person>>(result.Value);
            Assert.Equal(200, result.StatusCode);
            Assert.Equal(3, items.Count);
            Assert.Equal(_fixture.testPeople[0].FirstName, items[0].FirstName);
        }

        [Fact]
        public void PeopleGet_TestSlow()
        {
            _moqService.Setup(m => m.getPeople(It.IsAny<string>())).Returns(_fixture.testPeople);
            var watch = System.Diagnostics.Stopwatch.StartNew();
            var result = _controller.People("test", true).Result as ObjectResult;
            watch.Stop();
            var elapsedMs = watch.ElapsedMilliseconds;
            Assert.True(Convert.ToInt32(elapsedMs) > 7000);
            var items = Assert.IsType<List<Person>>(result.Value);
            Assert.Equal(200, result.StatusCode);
            Assert.Equal(3, items.Count);
            Assert.Equal(_fixture.testPeople[0].FirstName, items[0].FirstName);
        }

        [Fact]
        public void PeopleGet_Fail()
        {
            _moqService.Setup(m => m.getPeople(It.IsAny<string>())).Throws(new Exception());
            var result = _controller.People("test", false).Result as ObjectResult;
            var item = Assert.IsType<List<Person>>(result.Value);
            Assert.Equal(500, result.StatusCode);
            Assert.Equal(new List<Person>(), item);
        }

        [Fact]
        public void PeoplePost_Success()
        {
            var result = _controller.People(_fixture.testPeople[0]) as StatusCodeResult;
            Assert.Equal(200, result.StatusCode);
        }

        [Fact]
        public void PeoplePost_Fail()
        {
            _moqService.Setup(m => m.savePerson(It.IsAny<Person>())).Throws(new Exception());
            var result = _controller.People(_fixture.testPeople[0]) as StatusCodeResult;
            Assert.Equal(500, result.StatusCode);
        }
    }
}
