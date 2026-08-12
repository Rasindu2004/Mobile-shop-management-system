<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class DealerRequestController extends Controller
{
    public function sendRequest()
    {
        $user = Auth::user();

        
        if ($user->role === 'dealer' || $user->is_dealer_requested) {
            return back()->with('error', 'ඔබ දැනටමත් ඉල්ලීමක් කර ඇත.');
        }

        // Database update to mark dealer request
        $user->update([
            'is_dealer_requested' => true
        ]);

        return back()->with('message', 'ඔබේ Dealer ඉල්ලීම සාර්ථකව යොමු කරන ලදී. Admin පරීක්ෂාවෙන් පසු ඔබට දැනුම් දෙනු ඇත.');
    }
}