using Microsoft.AspNetCore.Mvc;
using System;

[ApiController]
[Route("[controller]")]

public class CheckoutController : ControllerBase {
    [HttpPost]
    public ActionResult Checkout([FromBody] CheckoutRequest request) {
        try {


            
        } catch (Exception e) { //TODO: Fix this to a real thing
            return BadRequest(e.Message);
        }
    }
}