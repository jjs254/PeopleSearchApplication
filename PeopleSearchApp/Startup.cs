using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PeopleSearchApp.Models;
using PeopleSearchApp.Services;

namespace PeopleSearchApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddScoped<IPeopleService, PeopleService>();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            using (var context = new PersonContext())
            {
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();
                context.People.Add(new Person("Jim", "Thompson", "11234 Newcastle Way", "Las Vegas", "Nevada", 89878, 23, "Biking, hiking, and just being outdoors!", "defaultProfile.jpg"));
                context.People.Add(new Person("Tessa", "Fielding", "46352 Carnation Cir.", "Salt Lake City", "Utah", 84569, 30, "I really like just spending time with my family at the beach", "defaultProfile.jpg"));
                context.People.Add(new Person("Jim", "Roberts", "11234 Fielding Street", "Denver", "Colorado", 67876, 30, "Coding, traveling, reading", "defaultProfile.jpg"));
                context.People.Add(new Person("Teresa", "Billings", "478364 Nording Way", "San Francisco", "California", 98873, 45, "Cooking, theatre, and spending time visiting New York", "defaultProfile.jpg"));
                context.People.Add(new Person("Bob", "Young", "18987 S 8776 W", "Provo", "Utah", 67876, 50, "I enjoy fixing cars and going on cruises.", "defaultProfile.jpg"));
                context.SaveChanges();
            }

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
