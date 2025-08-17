import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, Search, Filter, Check } from 'lucide-react';
import { Country, getCountriesByRegion, getRegions } from '@/data/countries';

interface CountrySelectorProps {
  selectedCountries: string[];
  onCountryToggle: (countryId: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountries,
  onCountryToggle,
  onSelectAll,
  onClearAll
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRegions, setExpandedRegions] = useState<string[]>(['North America', 'Europe']); // Default expanded

  const regions = getRegions();
  
  const filteredCountries = useMemo(() => {
    if (!searchTerm) return null;
    
    const searchLower = searchTerm.toLowerCase();
    return regions.flatMap(region => 
      getCountriesByRegion(region).filter(country =>
        country.name.toLowerCase().includes(searchLower) ||
        country.region.toLowerCase().includes(searchLower)
      )
    );
  }, [searchTerm, regions]);

  const toggleRegion = (region: string) => {
    setExpandedRegions(prev => 
      prev.includes(region) 
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  };

  const isRegionExpanded = (region: string) => expandedRegions.includes(region);

  const getSelectedCountInRegion = (region: string) => {
    return getCountriesByRegion(region).filter(country => 
      selectedCountries.includes(country.id)
    ).length;
  };

  const getTotalCountInRegion = (region: string) => {
    return getCountriesByRegion(region).length;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Select Countries for News
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{selectedCountries.length} countries selected</span>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onSelectAll}
              className="h-7 text-xs"
            >
              Select All
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onClearAll}
              className="h-7 text-xs"
            >
              Clear All
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search countries or regions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Search Results */}
        {searchTerm && filteredCountries && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Search Results</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {filteredCountries.map(country => (
                <Button
                  key={country.id}
                  variant={selectedCountries.includes(country.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => onCountryToggle(country.id)}
                  className="h-9 justify-start gap-2"
                >
                  <span className="text-lg">{country.flag}</span>
                  <span className="truncate">{country.name}</span>
                  {selectedCountries.includes(country.id) && (
                    <Check className="h-3 w-3 ml-auto" />
                  )}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Region-based Country Selection */}
        {!searchTerm && (
          <div className="space-y-4">
            {regions.map(region => {
              const countries = getCountriesByRegion(region);
              const selectedCount = getSelectedCountInRegion(region);
              const totalCount = getTotalCountInRegion(region);
              const isExpanded = isRegionExpanded(region);
              
              return (
                <div key={region} className="border rounded-lg">
                  <Button
                    variant="ghost"
                    className="w-full justify-between h-12 px-4 hover:bg-accent/50"
                    onClick={() => toggleRegion(region)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{region}</span>
                      <Badge variant="secondary" className="text-xs">
                        {selectedCount}/{totalCount}
                      </Badge>
                    </div>
                    <Filter className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </Button>
                  
                  {isExpanded && (
                    <div className="p-4 pt-0">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {countries.map(country => (
                          <Button
                            key={country.id}
                            variant={selectedCountries.includes(country.id) ? "default" : "outline"}
                            size="sm"
                            onClick={() => onCountryToggle(country.id)}
                            className="h-9 justify-start gap-2"
                          >
                            <span className="text-lg">{country.flag}</span>
                            <span className="truncate text-xs">{country.name}</span>
                            {selectedCountries.includes(country.id) && (
                              <Check className="h-3 w-3 ml-auto" />
                            )}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};