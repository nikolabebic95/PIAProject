using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace RestApi.Util
{
    public static class ShaUtil
    {
        public static string ComputeSha256Hash(string data)
        {
            // Create a SHA256   
            using (var sha256Hash = SHA256.Create())
            {
                // ComputeHash - returns byte array  
                var bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(data));

                // Convert byte array to a string   
                var builder = new StringBuilder();
                foreach (var b in bytes)
                {
                    builder.Append(b.ToString("x2"));
                }
                return builder.ToString();
            }
        }
    }
}