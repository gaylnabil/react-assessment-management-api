using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using react_assessment_management_api.Data;
using react_assessment_management_api.Models;

namespace react_assessment_management_api.Controllers
{
    [EnableCors()]
    [Route("api/[controller]")]
    [ApiController]
    public class BeersController : ControllerBase
    {
        private readonly AssessementDbContext _context;

        public BeersController(AssessementDbContext context)
        {
            _context = context;
        }

        // GET: api/Beers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Beer>>> GetBeers()
        {
            if (_context.Beers == null)
            {
                return NotFound();
            }
            return await _context.Beers.ToListAsync();
        }

        // GET: api/Beers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Beer>> GetBeer(int id)
        {
            if (_context.Beers == null)
            {
                return NotFound();
            }
            var beer = await _context.Beers.FindAsync(id);

            if (beer == null)
            {
                return NotFound();
            }

            return beer;
        }

        // PUT: api/Beers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBeer(int id, Beer beer)
        {
            if (id != beer.Id)
            {
                return BadRequest();
            }

            _context.Entry(beer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BeerExists(id))
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

        // POST: api/Beers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Beer>> PostBeer(Beer beer)
        {
            if (_context.Beers == null)
            {
                return Problem("Entity set 'AssessementDbContext.Beers'  is null.");
            }
            _context.Beers.Add(beer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBeer", new { id = beer.Id }, beer);
        }

        // DELETE: api/Beers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBeer(int id)
        {
            if (_context.Beers == null)
            {
                return NotFound();
            }
            var beer = await _context.Beers.FindAsync(id);
            if (beer == null)
            {
                return NotFound();
            }

            _context.Beers.Remove(beer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BeerExists(int id)
        {
            return (_context.Beers?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
