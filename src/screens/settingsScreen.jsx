'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/supabaseClient';

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ full_name: '', user_name: '', email: '' });
  const [address, setAddress] = useState({
    unit_number: '',
    street_number: '',
    address_line1: '',
    address_line2: '',
    city: '',
    region: '',
    postal_code: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      setUser(data.user);
      setForm({
        full_name: data.user?.user_metadata?.full_name || '',
        user_name: data.user?.user_metadata?.user_name || '',
        email: data.user?.email || ''
      });
      // Fetch address (assume address table has user_id column for simplicity)
      let addressData = null;
      if (data.user) {
        const { data: addr } = await supabase
          .from('address')
          .select('*')
          .eq('user_id', data.user.id)
          .single();
        if (addr) setAddress(addr);
      }
      setLoading(false);
    });
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddressChange = e => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSave = async e => {
    e.preventDefault();
    setSaving(true);
    setError('');
    // Update user metadata in Supabase
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        full_name: form.full_name,
        user_name: form.user_name
      }
    });
    // Upsert address (assume address table has user_id column)
    let addressError = null;
    if (user) {
      const { error: addrErr } = await supabase
        .from('address')
        .upsert({
          ...address,
          user_id: user.id
        }, { onConflict: ['user_id'] });
      addressError = addrErr;
    }
    if (updateError || addressError) setError((updateError?.message || '') + (addressError?.message || ''));
    setSaving(false);
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow mt-8">
      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
  <form onSubmit={handleSave} className="space-y-5" aria-label="Account Settings">
        {/* User fields */}
        <div>
          <label htmlFor="full_name" className="block font-medium mb-1 text-black">Full Name</label>
          <input
            id="full_name"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-black focus:ring-2 focus:ring-blue-500 transition-all duration-150 focus:shadow-lg"
            required
            aria-label="Full Name"
          />
        </div>
        <div>
          <label htmlFor="user_name" className="block font-medium mb-1 text-black">Username</label>
          <input
            id="user_name"
            name="user_name"
            value={form.user_name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-black focus:ring-2 focus:ring-blue-500 transition-all duration-150 focus:shadow-lg"
            required
            aria-label="Username"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium mb-1 text-black">Email</label>
          <input
            id="email"
            name="email"
            value={form.email}
            disabled
            className="w-full border px-3 py-2 rounded bg-gray-100 text-black"
            aria-label="Email"
          />
        </div>
        {/* Address fields */}
        <div className="pt-6 border-t">
          <h3 className="font-semibold mb-2 text-black">Address</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="unit_number" className="block text-sm mb-1 text-black">Unit Number</label>
              <input
                id="unit_number"
                name="unit_number"
                value={address.unit_number}
                onChange={handleAddressChange}
                className="w-full border px-2 py-1 rounded text-black focus:ring-2 focus:ring-blue-500 transition-all duration-150 focus:shadow-lg"
                aria-label="Unit Number"
              />
            </div>
            <div>
              <label htmlFor="street_number" className="block text-sm mb-1 text-black">Street Number</label>
              <input
                id="street_number"
                name="street_number"
                value={address.street_number}
                onChange={handleAddressChange}
                className="w-full border px-2 py-1 rounded text-black focus:ring-2 focus:ring-blue-500 transition-all duration-150 focus:shadow-lg"
                aria-label="Street Number"
              />
            </div>
          </div>
          <div className="mt-2">
            <label htmlFor="address_line1" className="block text-sm mb-1 text-black">Address Line 1</label>
            <input
              id="address_line1"
              name="address_line1"
              value={address.address_line1}
              onChange={handleAddressChange}
              className="w-full border px-2 py-1 rounded text-black focus:ring-2 focus:ring-blue-500 transition-all duration-150 focus:shadow-lg"
              aria-label="Address Line 1"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="address_line2" className="block text-sm mb-1 text-black">Address Line 2</label>
            <input
              id="address_line2"
              name="address_line2"
              value={address.address_line2}
              onChange={handleAddressChange}
              className="w-full border px-2 py-1 rounded text-black focus:ring-2 focus:ring-blue-500 transition-all duration-150 focus:shadow-lg"
              aria-label="Address Line 2"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div>
              <label htmlFor="city" className="block text-sm mb-1 text-black">City</label>
              <input
                id="city"
                name="city"
                value={address.city}
                onChange={handleAddressChange}
                className="w-full border px-2 py-1 rounded text-black focus:ring-2 focus:ring-blue-500 transition-all duration-150 focus:shadow-lg"
                aria-label="City"
              />
            </div>
            <div>
              <label htmlFor="region" className="block text-sm mb-1 text-black">Region</label>
              <input
                id="region"
                name="region"
                value={address.region}
                onChange={handleAddressChange}
                className="w-full border px-2 py-1 rounded text-black focus:ring-2 focus:ring-blue-500 transition-all duration-150 focus:shadow-lg"
                aria-label="Region"
              />
            </div>
          </div>
          <div className="mt-2">
            <label htmlFor="postal_code" className="block text-sm mb-1 text-black">Postal Code</label>
            <input
              id="postal_code"
              name="postal_code"
              value={address.postal_code}
              onChange={handleAddressChange}
              className="w-full border px-2 py-1 rounded text-black focus:ring-2 focus:ring-blue-500 transition-all duration-150 focus:shadow-lg"
              aria-label="Postal Code"
            />
          </div>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all duration-150 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          aria-label="Save Changes"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
