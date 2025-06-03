import { parseSetlistData, setlistData } from './client/src/lib/festival-data';
import { Artist, InsertArtist, UserSelection, InsertUserSelection, insertArtistSchema, insertUserSelectionSchema } from './shared/schema';

// In-memory storage for the worker
let artists: Artist[] = [];
let userSelections: UserSelection[] = [];
let initialized = false;

// Initialize data on first request
function initializeData() {
  if (!initialized) {
    artists = parseSetlistData(setlistData);
    initialized = true;
  }
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Handle CORS preflight
function handleCORS(request: Request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }
}

// Route handlers
async function handleArtists(request: Request): Promise<Response> {
  initializeData();
  
  if (request.method === 'GET') {
    return new Response(JSON.stringify(artists), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
  
  if (request.method === 'POST') {
    try {
      const body = await request.json();
      const validatedData = insertArtistSchema.parse(body);
      const newArtist: Artist = {
        ...validatedData,
        id: Math.max(...artists.map(a => a.id), 0) + 1,
      };
      artists.push(newArtist);
      
      return new Response(JSON.stringify(newArtist), {
        status: 201,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Invalid artist data' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }
    }
    
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }
  
  async function handleSelections(request: Request): Promise<Response> {
    if (request.method === 'GET') {
      return new Response(JSON.stringify(userSelections), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
    
    if (request.method === 'POST') {
      try {
        const body = await request.json();
        const validatedData = insertUserSelectionSchema.parse(body);
        const newSelection: UserSelection = {
          ...validatedData,
          id: Math.max(...userSelections.map(s => s.id), 0) + 1,
          selected: validatedData.selected ?? true,
          createdAt: new Date(),
        };
        userSelections.push(newSelection);
        
        return new Response(JSON.stringify(newSelection), {
          status: 201,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      } catch (error) {
        return new Response(JSON.stringify({ message: 'Invalid selection data' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }
    }
    
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }
  
  async function handleDeleteSelection(request: Request, artistId: string): Promise<Response> {
    if (request.method === 'DELETE') {
      const id = parseInt(artistId);
      if (isNaN(id)) {
        return new Response(JSON.stringify({ message: 'Invalid artist ID' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }
      
      userSelections = userSelections.filter(s => s.artistId !== id);
      
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }
    
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }
  
  // Main fetch handler
  export default {
    async fetch(request: Request, env: Env): Promise<Response> {
      const corsResponse = handleCORS(request);
      if (corsResponse) return corsResponse;
      
      const url = new URL(request.url);
      const path = url.pathname;
      
      // API routes
      if (path === '/api/artists') {
        return handleArtists(request);
      }
      
      if (path === '/api/selections') {
        return handleSelections(request);
      }
      
      if (path.startsWith('/api/selections/')) {
        const artistId = path.split('/').pop();
        if (artistId) {
          return handleDeleteSelection(request, artistId);
        }
      }
      
      // Serve static files
      try {
        // For the root path, serve index.html
        if (path === '/') {
          const indexHtml = await env.ASSETS.fetch(new Request(`${url.origin}/index.html`, request));
          return indexHtml;
        }
        
        // For other paths, try to serve from assets
        const assetResponse = await env.ASSETS.fetch(request);
        if (assetResponse.status === 404) {
          // If asset not found, serve index.html for SPA routing
          return await env.ASSETS.fetch(new Request(`${url.origin}/index.html`, request));
        }
        return assetResponse;
      } catch (error) {
        return new Response('Not found', { status: 404, headers: corsHeaders });
      }
    },
  };
  
  // Environment interface
  interface Env {
    ASSETS: any;
  }
