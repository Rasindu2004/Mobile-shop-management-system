<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    // sve msg
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        ContactMessage::create($validated);

        return redirect()->back()->with('success', 'Message sent successfully!');
    }

    // Admin Dashboard send msg
    public function index()
    {
        return Inertia::render('Dashboard', [
            'contacts' => ContactMessage::latest()->get()
        ]);
    }

    //  (Delete Function)
    public function destroy($id)
    {
        $message = ContactMessage::findOrFail($id);
        $message->delete();

        return redirect()->back()->with('success', 'Message deleted successfully!');
    }
}