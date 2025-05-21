export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();


    if (!username || !email || !password) {
      return new Response(
        JSON.stringify({ message: 'All fields are required' }),
        { status: 400 }
      );
    }

    return Response.json({
      success: true,
      message: 'Registration successful',
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500 }
    );
  }
}