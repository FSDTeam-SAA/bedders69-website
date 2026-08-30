"use client";

import { useState, useEffect, useCallback } from "react";
import savedCarersApi from "../api/savedCarersApi";
import { SavedCarerItem } from "../types/savedCarers.types";

const INITIAL_FALLBACK_CARERS: SavedCarerItem[] = [
  {
    carerId: "1",
    id: "1",
    name: "Matthew Warkentin",
    rating: 4.9,
    reviews: 67,
    location: "London, N1",
    bio: "Compassionate Care Assistant with 5+ years supporting elderly and vulnerable adults.",
    skills: ["Dementia Care", "Medication Admin"],
    experience: "2 Years",
    verified: "DBS Verified",
    rate: "$150/hrs",
    available: true,
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
    qualifications: [
      "NVQ Level 3 Health & Social Care",
      "First Aid Certificate (2023)",
      "Dementia Care Training",
    ],
    availability:
      "Mon–Fri 7am–6pm · Sat 8am–2pm · Emergency 24/7 · Weekends · Day Shifts · Night Shifts · Live-In",
    serviceArea: "Manchester, Greater Manchester",
  },
  {
    carerId: "2",
    id: "2",
    name: "Sarah Palmer",
    rating: 4.7,
    reviews: 35,
    location: "Birmingham, B2",
    bio: "Dedicated Support Worker with a focus on mental health and well-being.",
    skills: ["Mental Health Support", "Crisis Intervention"],
    experience: "3 Years",
    verified: "DBS Verified",
    rate: "$120/hrs",
    available: true,
    image:
      "https://images.unsplash.com/photo-1594824813527-39908cf8b5cf?auto=format&fit=crop&w=800&q=80",
    qualifications: [
      "BSc Psychology",
      "Mental Health First Aid",
      "Crisis Prevention Certificate",
    ],
    availability: "Mon–Fri 8am–5pm · Weekends · Day Shifts",
    serviceArea: "Birmingham, West Midlands",
  },
  {
    carerId: "3",
    id: "3",
    name: "John Smith",
    rating: 4.8,
    reviews: 50,
    location: "Manchester, M1",
    bio: "Experienced Home Carer specialized in personal care and companionship.",
    skills: ["Personal Care", "Companionship"],
    experience: "4 Years",
    verified: "DBS Verified",
    rate: "$140/hrs",
    available: true,
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80",
    qualifications: [
      "Care Certificate",
      "Moving & Handling Qualified",
      "Food Hygiene Level 2",
    ],
    availability: "Flexible · Day & Night Shifts",
    serviceArea: "Manchester, Greater Manchester",
  },
];

export function useSavedCarers() {
  const [carers, setCarers] = useState<SavedCarerItem[]>(INITIAL_FALLBACK_CARERS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCarers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await savedCarersApi.getSavedCarers();
      if (response && response.data && response.data.length > 0) {
        setCarers(response.data);
      }
    } catch (err: any) {
      console.warn("Using fallback saved carers data:", err?.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveCarer = async (carer: Partial<SavedCarerItem>): Promise<boolean> => {
    try {
      const response = await savedCarersApi.saveCarer(carer);
      if (response && response.data) {
        setCarers((prev) => [response.data, ...prev.filter((c) => (c.carerId || c.id) !== (carer.carerId || carer.id))]);
      }
      return true;
    } catch (err) {
      console.error("Error saving carer:", err);
      return false;
    }
  };

  const removeCarer = async (id: string): Promise<boolean> => {
    try {
      await savedCarersApi.removeSavedCarer(id);
      setCarers((prev) => prev.filter((c) => c.carerId !== id && c.id !== id && c._id !== id));
      return true;
    } catch (err) {
      console.error("Error removing saved carer:", err);
      // Optimistic removal for UI
      setCarers((prev) => prev.filter((c) => c.carerId !== id && c.id !== id && c._id !== id));
      return true;
    }
  };

  useEffect(() => {
    fetchCarers();
  }, [fetchCarers]);

  return {
    carers,
    isLoading,
    error,
    refetch: fetchCarers,
    saveCarer,
    removeCarer,
  };
}

export function useSavedCarerDetail(id: string) {
  const [carer, setCarer] = useState<SavedCarerItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await savedCarersApi.getSavedCarerDetail(id);
      if (response && response.data) {
        setCarer(response.data);
      }
    } catch (err: any) {
      // Fallback from initial data
      const fallback = INITIAL_FALLBACK_CARERS.find((c) => c.carerId === id || c.id === id);
      if (fallback) {
        setCarer(fallback);
      } else {
        setError(err?.message || "Failed to load carer detail");
      }
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return {
    carer,
    isLoading,
    error,
    refetch: fetchDetail,
  };
}

export default useSavedCarers;
