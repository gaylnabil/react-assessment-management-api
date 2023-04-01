using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using react_assessment_management_api.Data;
using react_assessment_management_api.Models;

namespace react_assessment_management_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly AssessementDbContext _context;

        public CompaniesController(AssessementDbContext context)
        {
            _context = context;
        }

        // GET: api/Companies/Products
        [EnableCors()]
        [HttpGet("Products")]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompaniesWtihProducts()
        {
            if (_context.Companies == null)
            {
                return NotFound();
            }
            return await _context.Companies.Include(c => c.Products).ToListAsync();
        }

        // GET: api/Companies
        [HttpGet]
        [EnableCors()]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompanies()
        {
            if (_context.Companies == null)
            {
                return NotFound();
            }
            return await _context.Companies.ToListAsync();
        }

        // GET: api/Companies/5
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Company), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Company>> GetCompany(int id)
        {
            if (_context.Companies == null)
            {
                return NotFound();
            }
            // var Company = await _context.Companies.FindAsync(id);
            var company = await _context.Companies.Include(brw => brw.Products).FirstOrDefaultAsync(brw => brw.Id == id);

            if (company == null)
            {
                return NotFound();
            }

            return Ok(company);
        }

        // PUT: api/Companies/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompany(int id, Company company)
        {
            if (id != company.Id)
            {
                return BadRequest();
            }

            _context.Entry(company).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Companies
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [EnableCors()]
        [HttpPost]
        public async Task<ActionResult<Company>> PostCompany(Company company)
        {
            if (_context.Companies == null)
            {
                return Problem("Entity set 'AssessementDbContext.Companies'  is null.");
            }
            _context.Companies.Add(company);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCompany", new { id = company.Id }, company);
        }

        // DELETE: api/Companies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            if (_context.Companies == null)
            {
                return NotFound();
            }
            var company = await _context.Companies.FindAsync(id);
            if (company == null)
            {
                return NotFound();
            }

            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CompanyExists(int id)
        {
            return (_context.Companies?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
