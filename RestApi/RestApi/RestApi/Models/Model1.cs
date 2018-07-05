namespace RestApi.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class Model1 : DbContext
    {
        public Model1()
            : base("name=ConnectionModel")
        {
        }

        public virtual DbSet<Announcement> Announcements { get; set; }
        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<Contract> Contracts { get; set; }
        public virtual DbSet<ContractStatu> ContractStatus { get; set; }
        public virtual DbSet<CooperatesWith> CooperatesWiths { get; set; }
        public virtual DbSet<DonorContract> DonorContracts { get; set; }
        public virtual DbSet<Email> Emails { get; set; }
        public virtual DbSet<Lecture> Lectures { get; set; }
        public virtual DbSet<MoneyContract> MoneyContracts { get; set; }
        public virtual DbSet<Package> Packages { get; set; }
        public virtual DbSet<PackageItem> PackageItems { get; set; }
        public virtual DbSet<PhoneNumber> PhoneNumbers { get; set; }
        public virtual DbSet<sysdiagram> sysdiagrams { get; set; }
        public virtual DbSet<UserTable> UserTables { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Announcement>()
                .Property(e => e.Title)
                .IsFixedLength();

            modelBuilder.Entity<Announcement>()
                .Property(e => e.Description)
                .IsFixedLength();

            modelBuilder.Entity<Company>()
                .Property(e => e.Name)
                .IsFixedLength();

            modelBuilder.Entity<Company>()
                .Property(e => e.Address)
                .IsFixedLength();

            modelBuilder.Entity<Company>()
                .Property(e => e.City)
                .IsFixedLength();

            modelBuilder.Entity<Company>()
                .Property(e => e.ZipCode)
                .IsFixedLength();

            modelBuilder.Entity<Company>()
                .Property(e => e.Country)
                .IsFixedLength();

            modelBuilder.Entity<Company>()
                .Property(e => e.BankAccount)
                .IsFixedLength();

            modelBuilder.Entity<Company>()
                .Property(e => e.Currency)
                .IsFixedLength();

            modelBuilder.Entity<Company>()
                .Property(e => e.TaxNumber)
                .IsFixedLength();

            modelBuilder.Entity<Company>()
                .Property(e => e.ContactName)
                .IsFixedLength();

            modelBuilder.Entity<Company>()
                .Property(e => e.ContactPhone)
                .IsFixedLength();

            modelBuilder.Entity<Company>()
                .Property(e => e.ContactEmail)
                .IsFixedLength();

            modelBuilder.Entity<Company>()
                .Property(e => e.LogoPath)
                .IsFixedLength();

            modelBuilder.Entity<Contract>()
                .Property(e => e.Comment)
                .IsFixedLength();

            modelBuilder.Entity<Contract>()
                .HasOptional(e => e.DonorContract)
                .WithRequired(e => e.Contract)
                .WillCascadeOnDelete();

            modelBuilder.Entity<Contract>()
                .HasOptional(e => e.MoneyContract)
                .WithRequired(e => e.Contract)
                .WillCascadeOnDelete();

            modelBuilder.Entity<ContractStatu>()
                .Property(e => e.Name)
                .IsFixedLength();

            modelBuilder.Entity<ContractStatu>()
                .HasMany(e => e.Contracts)
                .WithRequired(e => e.ContractStatu)
                .HasForeignKey(e => e.StatusId);

            modelBuilder.Entity<DonorContract>()
                .Property(e => e.Description)
                .IsFixedLength();

            modelBuilder.Entity<Email>()
                .Property(e => e.Email1)
                .IsFixedLength();

            modelBuilder.Entity<Lecture>()
                .Property(e => e.Title)
                .IsFixedLength();

            modelBuilder.Entity<Lecture>()
                .Property(e => e.TitleEnglish)
                .IsFixedLength();

            modelBuilder.Entity<Lecture>()
                .Property(e => e.Description)
                .IsFixedLength();

            modelBuilder.Entity<Lecture>()
                .Property(e => e.DescriptionEnglish)
                .IsFixedLength();

            modelBuilder.Entity<Lecture>()
                .Property(e => e.Room)
                .IsFixedLength();

            modelBuilder.Entity<Lecture>()
                .Property(e => e.LecturerName)
                .IsFixedLength();

            modelBuilder.Entity<Lecture>()
                .Property(e => e.LecturerBio)
                .IsFixedLength();

            modelBuilder.Entity<Package>()
                .Property(e => e.Name)
                .IsFixedLength();

            modelBuilder.Entity<Package>()
                .Property(e => e.Color)
                .IsFixedLength();

            modelBuilder.Entity<Package>()
                .HasMany(e => e.Contracts)
                .WithRequired(e => e.Package)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<PackageItem>()
                .Property(e => e.Name)
                .IsFixedLength();

            modelBuilder.Entity<PackageItem>()
                .Property(e => e.Description)
                .IsFixedLength();

            modelBuilder.Entity<PhoneNumber>()
                .Property(e => e.PhoneNumber1)
                .IsFixedLength();

            modelBuilder.Entity<UserTable>()
                .Property(e => e.FirstName)
                .IsFixedLength();

            modelBuilder.Entity<UserTable>()
                .Property(e => e.LastName)
                .IsFixedLength();

            modelBuilder.Entity<UserTable>()
                .Property(e => e.Email)
                .IsFixedLength();

            modelBuilder.Entity<UserTable>()
                .Property(e => e.Organization)
                .IsFixedLength();

            modelBuilder.Entity<UserTable>()
                .Property(e => e.Username)
                .IsFixedLength();

            modelBuilder.Entity<UserTable>()
                .Property(e => e.PasswordHash)
                .IsFixedLength();

            modelBuilder.Entity<UserTable>()
                .Property(e => e.Gender)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<UserTable>()
                .Property(e => e.LinkedInAddress)
                .IsFixedLength();

            modelBuilder.Entity<UserTable>()
                .Property(e => e.Type)
                .IsFixedLength()
                .IsUnicode(false);
        }
    }
}
