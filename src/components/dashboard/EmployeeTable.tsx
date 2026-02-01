import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import type { SurveyResult } from '../../types/database';

interface EmployeeTableProps {
  surveys: SurveyResult[];
}

export function EmployeeTable({ surveys }: EmployeeTableProps) {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<'created_at' | 'total_score' | 'total_leadership_potential'>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedSurveys = [...surveys].sort((a, b) => {
    let aVal: any;
    let bVal: any;

    switch (sortField) {
      case 'total_score':
        aVal = a.total_score || 0;
        bVal = b.total_score || 0;
        break;
      case 'total_leadership_potential':
        aVal = a.total_leadership_potential || 0;
        bVal = b.total_leadership_potential || 0;
        break;
      case 'created_at':
      default:
        aVal = new Date(a.created_at).getTime();
        bVal = new Date(b.created_at).getTime();
        break;
    }

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  if (surveys.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        No surveys completed yet. Start your first assessment!
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <button
                onClick={() => handleSort('created_at')}
                className="font-semibold hover:text-gray-900 dark:hover:text-white"
              >
                Date {sortField === 'created_at' && (sortDirection === 'asc' ? '↑' : '↓')}
              </button>
            </TableHead>
            <TableHead className="text-right">
              <button
                onClick={() => handleSort('total_leadership_potential')}
                className="font-semibold hover:text-gray-900 dark:hover:text-white"
              >
                Leadership {sortField === 'total_leadership_potential' && (sortDirection === 'asc' ? '↑' : '↓')}
              </button>
            </TableHead>
            <TableHead className="text-right">
              <button
                onClick={() => handleSort('total_score')}
                className="font-semibold hover:text-gray-900 dark:hover:text-white"
              >
                Total Score {sortField === 'total_score' && (sortDirection === 'asc' ? '↑' : '↓')}
              </button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedSurveys.map((survey) => (
            <TableRow
              key={survey.id}
              onClick={() => navigate(`/dashboard/employee/${survey.id}`)}
              className="cursor-pointer"
            >
              <TableCell>{formatDate(survey.created_at)}</TableCell>
              <TableCell className="text-right">{survey.total_leadership_potential || 0}</TableCell>
              <TableCell className="text-right font-semibold">{survey.total_score || 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
