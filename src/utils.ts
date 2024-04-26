const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
    "Access-Control-Max-Age": "86400"
}

export function toJSON(data: unknown, status = 200): Response {
    const body = JSON.stringify(data, null, 2);
    const headers = {'content-type': 'application/json',...corsHeaders, "x-derby":"cors"};
    return new Response(body, {headers, status});
}

export function toError(error: string | unknown, status = 400): Response {
    return toJSON({error}, status);
}

export function reply(output: unknown): Response {
    if (output != null) return toJSON(output, 200);
    return toError('Error with query', 500);
}
