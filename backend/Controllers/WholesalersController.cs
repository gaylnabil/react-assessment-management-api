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
    public class WholesalersController : ControllerBase
    {
        private readonly AssessementDbContext _context;

        public WholesalersController(AssessementDbContext context)
        {
            _context = context;
        }

        // GET: api/Wholesalers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Wholesaler>>> GetWholesalers()
        {
            if (_context.Wholesalers == null)
            {
                return NotFound();
            }
            return await _context.Wholesalers.ToListAsync();
        }

        // GET: api/Wholesalers/Stocks
        [HttpGet("Stocks")]
        public async Task<ActionResult<IEnumerable<Wholesaler>>> GetWholesalersStocks()
        {
            if (_context.Wholesalers == null)
            {
                return NotFound();
            }
            return await _context.Wholesalers.Include(w => w.Stocks).ToListAsync();
        }

        // GET: api/Wholesalers/Stocks/Products
        [HttpGet("Stocks/Products")]
        public async Task<ActionResult<IEnumerable<Wholesaler>>> GetWholesalersStocksProduct()
        {
            if (_context.Wholesalers == null)
            {
                return NotFound();
            }
            return await _context.Wholesalers.Include(w => w.Stocks)
                                             .ThenInclude(s => s.Product)
                                             .ToListAsync();
        }



        // GET: api/Wholesalers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Wholesaler>> GetWholesaler(int id)
        {
            if (_context.Wholesalers == null)
            {
                return NotFound();
            }
            var wholesaler = await _context.Wholesalers.FindAsync(id);

            if (wholesaler == null)
            {
                return NotFound();
            }

            return wholesaler;
        }

        // GET: api/Wholesalers/5/Stocks
        [HttpGet("{id}/Stocks")]
        public async Task<ActionResult<Wholesaler>> GetWholesalerWithStocks(int id)
        {
            if (_context.Wholesalers == null)
            {
                return NotFound();
            }
            var wholesaler = await _context.Wholesalers.Where(w => w.Id == id)
                                                       .Include(w => w.Stocks)
                                                       .SingleOrDefaultAsync();


            if (wholesaler == null)
            {
                return NotFound();
            }

            return wholesaler;
        }
        // GET: api/Wholesalers/5/Stocks/Products
        [HttpGet("{id}/Stocks/Products")]
        public async Task<ActionResult<Wholesaler>> GetWholesalerWithStocksAndProducts(int id)
        {
            if (_context.Wholesalers == null)
            {
                return NotFound();
            }
            var wholesaler = await _context.Wholesalers.Where(w => w.Id == id)
                                                               .Include(w => w.Stocks)
                                                               .ThenInclude(s => s.Product)
                                                               .SingleOrDefaultAsync();


            if (wholesaler == null)
            {
                return NotFound();
            }

            return wholesaler;
        }

        // GET: api/Wholesalers/5/Products
        [HttpGet("{id}/Products")]
        public async Task<ActionResult<IEnumerable<Product>>?> GetWholesalerWithProducts(int id)
        {
            if (_context.Products == null)
            {
                return null;
            }
            var product = await _context.Products.Where(b => b.Stocks.Any(s => s.WholesalerId == id)).ToListAsync();
                                          
            if (product == null)
            {
                return null;
            }

            return product;
        }

        // PUT: api/Wholesalers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWholesaler(int id, Wholesaler wholesaler)
        {
            if (id != wholesaler.Id)
            {
                return BadRequest();
            }

            _context.Entry(wholesaler).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WholesalerExists(id))
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

        // POST: api/Wholesalers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Wholesaler>> PostWholesaler(Wholesaler wholesaler)
        {
            if (_context.Wholesalers == null)
            {
                return Problem("Entity set 'AssessementDbContext.Wholesalers'  is null.");
            }
            _context.Wholesalers.Add(wholesaler);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWholesaler", new { id = wholesaler.Id }, wholesaler);
        }

        // DELETE: api/Wholesalers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWholesaler(int id)
        {
            if (_context.Wholesalers == null)
            {
                return NotFound();
            }
            var wholesaler = await _context.Wholesalers.FindAsync(id);
            if (wholesaler == null)
            {
                return NotFound();
            }

            _context.Wholesalers.Remove(wholesaler);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WholesalerExists(int id)
        {
            return (_context.Wholesalers?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
