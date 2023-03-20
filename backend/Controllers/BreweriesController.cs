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
    public class BreweriesController : ControllerBase
    {
        private readonly AssessementDbContext _context;

        public BreweriesController(AssessementDbContext context)
        {
            _context = context;
        }

        // GET: api/Breweries/beers
        [EnableCors()]
        [HttpGet("Beers")]
        public async Task<ActionResult<IEnumerable<Brewery>>> GetBreweriesWtihBeers()
        {
            if (_context.Breweries == null)
            {
                return NotFound();
            }
            return await _context.Breweries.Include(brw => brw.Beers).ToListAsync();
        }

        // GET: api/Breweries
        [HttpGet]
        [EnableCors()]
        public async Task<ActionResult<IEnumerable<Brewery>>> GetBreweries()
        {
            if (_context.Breweries == null)
            {
                return NotFound();
            }
            return await _context.Breweries.ToListAsync();
        }

        // GET: api/Breweries/5
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Brewery), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Brewery>> GetBrewery(int id)
        {
            if (_context.Breweries == null)
            {
                return NotFound();
            }
            // var brewery = await _context.Breweries.FindAsync(id);
            var brewery = await _context.Breweries.Include(brw => brw.Beers).FirstOrDefaultAsync(brw => brw.Id == id);

            if (brewery == null)
            {
                return NotFound();
            }

            return Ok(brewery);
        }

        // PUT: api/Breweries/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBrewery(int id, Brewery brewery)
        {
            if (id != brewery.Id)
            {
                return BadRequest();
            }

            _context.Entry(brewery).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BreweryExists(id))
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

        // POST: api/Breweries
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [EnableCors()]
        [HttpPost]
        public async Task<ActionResult<Brewery>> PostBrewery(Brewery brewery)
        {
            if (_context.Breweries == null)
            {
                return Problem("Entity set 'AssessementDbContext.Breweries'  is null.");
            }
            _context.Breweries.Add(brewery);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBrewery", new { id = brewery.Id }, brewery);
        }

        // DELETE: api/Breweries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBrewery(int id)
        {
            if (_context.Breweries == null)
            {
                return NotFound();
            }
            var brewery = await _context.Breweries.FindAsync(id);
            if (brewery == null)
            {
                return NotFound();
            }

            _context.Breweries.Remove(brewery);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BreweryExists(int id)
        {
            return (_context.Breweries?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
